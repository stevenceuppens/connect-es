// Copyright 2021-2023 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { ConnectError } from "./connect-error.js";
import { Code } from "./code.js";

/**
 * compressedFlag indicates that the data in a EnvelopedMessage is
 * compressed. It has the same meaning in the gRPC-Web, gRPC-HTTP2,
 * and Connect protocols.
 */
export const compressedFlag = 0b00000001;

/**
 * At most, allow ~4GiB to be received or sent per message.
 * zlib used by Node.js caps maxOutputLength at this value. It also happens to
 * be the maximum theoretical message size supported by protobuf-es.
 */
const maxReadMaxBytes = 0xffffffff; // zlib caps maxOutputLength at this value
const maxSendMaxBytes = maxReadMaxBytes;

/**
 * Compression provides methods to compress and decompress data with
 * a certain compression algorithm.
 */
export interface Compression {
  /**
   * The name of the compression algorithm.
   */
  name: string;

  /**
   * Compress a chunk of data.
   */
  compress: (bytes: Uint8Array) => Promise<Uint8Array>;

  /**
   * Decompress a chunk of data.
   *
   * Raises a ConnectError with Code.InvalidArgument if the decompressed
   * size exceeds readMaxBytes.
   */
  decompress: (bytes: Uint8Array, readMaxBytes: number) => Promise<Uint8Array>;
}

/**
 * Common options for compression.
 */
interface CompressionOptions {
  sendMaxBytes: number;
  readMaxBytes: number;
  compressMinBytes: number;
}

/**
 * Validate common options for compression, setting default values where an
 * option is omitted, and validating that
 */
export function compressionValidateOptions<
  T extends Partial<CompressionOptions>
>(opt: T): Omit<T, keyof CompressionOptions> & CompressionOptions {
  const sendMaxBytes = opt.sendMaxBytes ?? maxSendMaxBytes;
  const readMaxBytes = opt.readMaxBytes ?? maxReadMaxBytes;
  if (sendMaxBytes < 1 || sendMaxBytes > maxSendMaxBytes) {
    throw new ConnectError(
      `sendMaxBytes ${sendMaxBytes} must be >= 1 and <= ${maxSendMaxBytes}`,
      Code.Internal
    );
  }
  if (readMaxBytes < 1 || readMaxBytes > maxReadMaxBytes) {
    throw new ConnectError(
      `readMaxBytes ${readMaxBytes} must be >= 1 and <= ${maxReadMaxBytes}`,
      Code.Internal
    );
  }
  return {
    ...opt,
    sendMaxBytes,
    readMaxBytes,
    compressMinBytes: opt.compressMinBytes ?? 0,
  };
}

/**
 * Validates the request encoding and determines the accepted response encoding.
 *
 * Returns the request and response compression to use. If the client requested
 * an encoding that is not available, the returned object contains an error that
 * must be used for the response.
 */
export function compressionNegotiate(
  available: Compression[],
  requested: string | null, // e.g. the value of the Grpc-Encoding header
  accepted: string | null, // e.g. the value of the Grpc-Accept-Encoding header
  headerNameAcceptEncoding: string // e.g. the name of the Grpc-Accept-Encoding header
): {
  request: Compression | null;
  response: Compression | null;
  error?: ConnectError;
} {
  let request = null;
  let response = null;
  let error = undefined;
  if (requested !== null && requested !== "identity") {
    const found = available.find((c) => c.name === requested);
    if (found) {
      request = found;
    } else {
      // To comply with https://github.com/grpc/grpc/blob/master/doc/compression.md
      // and the Connect protocol, we return code "unimplemented" and specify
      // acceptable compression(s).
      const acceptable = available.map((c) => c.name).join(",");
      error = new ConnectError(
        `unknown compression "${requested}": supported encodings are ${acceptable}`,
        Code.Unimplemented,
        {
          [headerNameAcceptEncoding]: acceptable,
        }
      );
    }
  }
  if (accepted === null || accepted === "") {
    // Support asymmetric compression. This logic follows
    // https://github.com/grpc/grpc/blob/master/doc/compression.md and common
    // sense.
    response = request;
  } else {
    const acceptNames = accepted.split(",").map((n) => n.trim());
    for (const name of acceptNames) {
      const found = available.find((c) => c.name === name);
      if (found) {
        response = found;
        break;
      }
    }
  }
  return { request, response, error };
}