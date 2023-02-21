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

import type { Message } from "@bufbuild/protobuf";
import { ConnectError } from "../connect-error.js";
import { Code } from "../code.js";
import { MethodImplSpec, createHandlerContext } from "../implementation.js";
import {
  ProtocolHandlerFactory,
  UniversalHandlerOptions,
  validateUniversalHandlerOptions,
  UniversalServerRequest,
  UniversalServerResponse,
  uResponseMethodNotAllowed,
  uResponseOk,
  uResponseUnsupportedMediaType,
  Serialization,
  EnvelopedMessage,
  assertByteStreamRequest,
  compressionNegotiate,
  contentTypeMatcher,
  createMethodSerializationLookup,
  createMethodUrl,
  pipe,
  transformCompressEnvelope,
  transformDecompressEnvelope,
  transformJoinEnvelopes,
  transformParseEnvelope,
  transformPrepend,
  transformSerializeEnvelope,
  transformSplitEnvelope,
  transformCatchFinally,
  transformInvokeImplementation,
} from "../protocol/index.js";
import { grpcStatusOk, setTrailerStatus } from "../protocol-grpc/index.js";
import { createTrailerSerialization, trailerFlag } from "./trailer.js";
import {
  headerAcceptEncoding,
  headerContentType,
  headerEncoding,
  headerGrpcStatus,
} from "./headers.js";
import {
  contentTypeJson,
  contentTypeProto,
  contentTypeRegExp,
  parseContentType,
} from "./content-type.js";

const protocolName = "grpc-web";
const methodPost = "POST";

/**
 * Create a factory that creates gRPC-web handlers.
 */
export function createHandlerFactory(
  options: Partial<UniversalHandlerOptions>
): ProtocolHandlerFactory {
  const opt = validateUniversalHandlerOptions(options);
  const trailerSerialization = createTrailerSerialization();

  function fact(spec: MethodImplSpec) {
    const h = createHandler(opt, trailerSerialization, spec);
    return Object.assign(h, {
      protocolNames: [protocolName],
      allowedMethods: [methodPost],
      supportedContentType: contentTypeMatcher(contentTypeRegExp),
      requestPath: createMethodUrl("/", spec.service, spec.method),
      service: spec.service,
      method: spec.method,
    });
  }

  fact.protocolName = protocolName;
  return fact;
}

function createHandler<I extends Message<I>, O extends Message<O>>(
  opt: UniversalHandlerOptions,
  trailerSerialization: Serialization<Headers>,
  spec: MethodImplSpec<I, O>
) {
  const serialization = createMethodSerializationLookup(
    spec.method,
    opt.binaryOptions,
    opt.jsonOptions,
    opt
  );
  // eslint-disable-next-line @typescript-eslint/require-await
  return async function handle(
    req: UniversalServerRequest
  ): Promise<UniversalServerResponse> {
    assertByteStreamRequest(req);
    const type = parseContentType(req.header.get(headerContentType));
    if (type == undefined || type.text) {
      return uResponseUnsupportedMediaType;
    }
    if (req.method !== methodPost) {
      return uResponseMethodNotAllowed;
    }
    const context = createHandlerContext(
      spec,
      req.header,
      {
        [headerContentType]: type.binary ? contentTypeProto : contentTypeJson,
      },
      {
        [headerGrpcStatus]: grpcStatusOk,
      }
    );
    const compression = compressionNegotiate(
      opt.acceptCompression,
      req.header.get(headerEncoding),
      req.header.get(headerAcceptEncoding),
      headerAcceptEncoding
    );
    if (compression.response) {
      context.responseHeader.set(headerEncoding, compression.response.name);
    }
    const outputIt = pipe(
      req.body,
      transformPrepend<Uint8Array>(() => {
        // raise compression error to serialize it as a trailer status
        if (compression.error) throw compression.error;
        return undefined;
      }),
      transformSplitEnvelope(opt.readMaxBytes),
      transformDecompressEnvelope(compression.request, opt.readMaxBytes),
      transformParseEnvelope(
        serialization.getI(type.binary),
        trailerFlag
        // if we set `null` here, an end-stream-message in the request
        // raises an error, but we want to be lenient
      ),
      transformInvokeImplementation<I, O>(spec, context),
      transformSerializeEnvelope(serialization.getO(type.binary)),
      transformCatchFinally<EnvelopedMessage>((e) => {
        const trailer = context.responseTrailer;
        if (e !== undefined) {
          if (e instanceof ConnectError) {
            setTrailerStatus(trailer, e);
          } else {
            setTrailerStatus(
              trailer,
              new ConnectError(
                "internal error",
                Code.Internal,
                undefined,
                undefined,
                e
              )
            );
          }
        }
        return {
          flags: trailerFlag,
          data: trailerSerialization.serialize(trailer),
        };
      }),
      transformCompressEnvelope(compression.response, opt.compressMinBytes),
      transformJoinEnvelopes()
    );
    return {
      ...uResponseOk,
      body: outputIt,
      header: context.responseHeader,
    };
  };
}