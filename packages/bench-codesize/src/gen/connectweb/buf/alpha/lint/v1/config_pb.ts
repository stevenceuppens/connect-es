/* eslint-disable */
// @generated by protoc-gen-es v0.0.1 with parameter "ts_nocheck=false"
// @generated from file buf/alpha/lint/v1/config.proto (package buf.alpha.lint.v1, syntax proto3)

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message buf.alpha.lint.v1.Config
 */
export class Config extends Message<Config> {

    /**
     * @generated from field: string version = 1;
     */
    version = "";

    /**
     * @generated from field: repeated string use_ids = 2;
     */
    useIds: string[] = [];

    /**
     * @generated from field: repeated string except_ids = 3;
     */
    exceptIds: string[] = [];

    /**
     * @generated from field: repeated string ignore_paths = 4;
     */
    ignorePaths: string[] = [];

    /**
     * @generated from field: repeated buf.alpha.lint.v1.IDPaths ignore_id_paths = 5;
     */
    ignoreIdPaths: IDPaths[] = [];

    /**
     * @generated from field: string enum_zero_value_suffix = 6;
     */
    enumZeroValueSuffix = "";

    /**
     * @generated from field: bool rpc_allow_same_request_response = 7;
     */
    rpcAllowSameRequestResponse = false;

    /**
     * @generated from field: bool rpc_allow_google_protobuf_empty_requests = 8;
     */
    rpcAllowGoogleProtobufEmptyRequests = false;

    /**
     * @generated from field: bool rpc_allow_google_protobuf_empty_responses = 9;
     */
    rpcAllowGoogleProtobufEmptyResponses = false;

    /**
     * @generated from field: string service_suffix = 10;
     */
    serviceSuffix = "";

    /**
     * @generated from field: bool allow_comment_ignores = 11;
     */
    allowCommentIgnores = false;

    constructor(data?: PartialMessage<Config>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.lint.v1.Config";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "version", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 2, name: "use_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true},
        {no: 3, name: "except_ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true},
        {no: 4, name: "ignore_paths", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true},
        {no: 5, name: "ignore_id_paths", kind: "message", T: IDPaths, repeated: true},
        {no: 6, name: "enum_zero_value_suffix", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 7, name: "rpc_allow_same_request_response", kind: "scalar", T: 8 /* ScalarType.BOOL */},
        {no: 8, name: "rpc_allow_google_protobuf_empty_requests", kind: "scalar", T: 8 /* ScalarType.BOOL */},
        {no: 9, name: "rpc_allow_google_protobuf_empty_responses", kind: "scalar", T: 8 /* ScalarType.BOOL */},
        {no: 10, name: "service_suffix", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 11, name: "allow_comment_ignores", kind: "scalar", T: 8 /* ScalarType.BOOL */},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Config {
        return new Config().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Config {
        return new Config().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Config {
        return new Config().fromJsonString(jsonString, options);
    }

    static equals(a: Config | PlainMessage<Config> | undefined, b: Config | PlainMessage<Config> | undefined): boolean {
        return proto3.util.equals(Config, a, b);
    }

}


/**
 * @generated from message buf.alpha.lint.v1.IDPaths
 */
export class IDPaths extends Message<IDPaths> {

    /**
     * @generated from field: string id = 1;
     */
    id = "";

    /**
     * @generated from field: repeated string paths = 2;
     */
    paths: string[] = [];

    constructor(data?: PartialMessage<IDPaths>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.lint.v1.IDPaths";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */},
        {no: 2, name: "paths", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): IDPaths {
        return new IDPaths().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): IDPaths {
        return new IDPaths().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): IDPaths {
        return new IDPaths().fromJsonString(jsonString, options);
    }

    static equals(a: IDPaths | PlainMessage<IDPaths> | undefined, b: IDPaths | PlainMessage<IDPaths> | undefined): boolean {
        return proto3.util.equals(IDPaths, a, b);
    }

}

