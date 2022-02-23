/* eslint-disable */
// @generated by protoc-gen-es v0.0.1 with parameter "ts_nocheck=false"
// @generated from file buf/alpha/registry/v1alpha1/authn.proto (package buf.alpha.registry.v1alpha1, syntax proto3)

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import {User} from "./user_pb.js";

/**
 * @generated from message buf.alpha.registry.v1alpha1.GetCurrentUserRequest
 */
export class GetCurrentUserRequest extends Message<GetCurrentUserRequest> {

    constructor(data?: PartialMessage<GetCurrentUserRequest>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.registry.v1alpha1.GetCurrentUserRequest";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCurrentUserRequest {
        return new GetCurrentUserRequest().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCurrentUserRequest {
        return new GetCurrentUserRequest().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCurrentUserRequest {
        return new GetCurrentUserRequest().fromJsonString(jsonString, options);
    }

    static equals(a: GetCurrentUserRequest | PlainMessage<GetCurrentUserRequest> | undefined, b: GetCurrentUserRequest | PlainMessage<GetCurrentUserRequest> | undefined): boolean {
        return proto3.util.equals(GetCurrentUserRequest, a, b);
    }

}


/**
 * @generated from message buf.alpha.registry.v1alpha1.GetCurrentUserResponse
 */
export class GetCurrentUserResponse extends Message<GetCurrentUserResponse> {

    /**
     * @generated from field: buf.alpha.registry.v1alpha1.User user = 1;
     */
    user?: User;

    constructor(data?: PartialMessage<GetCurrentUserResponse>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.registry.v1alpha1.GetCurrentUserResponse";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "user", kind: "message", T: User},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCurrentUserResponse {
        return new GetCurrentUserResponse().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCurrentUserResponse {
        return new GetCurrentUserResponse().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCurrentUserResponse {
        return new GetCurrentUserResponse().fromJsonString(jsonString, options);
    }

    static equals(a: GetCurrentUserResponse | PlainMessage<GetCurrentUserResponse> | undefined, b: GetCurrentUserResponse | PlainMessage<GetCurrentUserResponse> | undefined): boolean {
        return proto3.util.equals(GetCurrentUserResponse, a, b);
    }

}


/**
 * @generated from message buf.alpha.registry.v1alpha1.GetCurrentUserSubjectRequest
 */
export class GetCurrentUserSubjectRequest extends Message<GetCurrentUserSubjectRequest> {

    constructor(data?: PartialMessage<GetCurrentUserSubjectRequest>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.registry.v1alpha1.GetCurrentUserSubjectRequest";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCurrentUserSubjectRequest {
        return new GetCurrentUserSubjectRequest().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCurrentUserSubjectRequest {
        return new GetCurrentUserSubjectRequest().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCurrentUserSubjectRequest {
        return new GetCurrentUserSubjectRequest().fromJsonString(jsonString, options);
    }

    static equals(a: GetCurrentUserSubjectRequest | PlainMessage<GetCurrentUserSubjectRequest> | undefined, b: GetCurrentUserSubjectRequest | PlainMessage<GetCurrentUserSubjectRequest> | undefined): boolean {
        return proto3.util.equals(GetCurrentUserSubjectRequest, a, b);
    }

}


/**
 * @generated from message buf.alpha.registry.v1alpha1.GetCurrentUserSubjectResponse
 */
export class GetCurrentUserSubjectResponse extends Message<GetCurrentUserSubjectResponse> {

    /**
     * @generated from field: string subject = 1;
     */
    subject = "";

    constructor(data?: PartialMessage<GetCurrentUserSubjectResponse>) {
        super();
        proto3.util.initPartial(data, this);
    }

    static readonly runtime = proto3;
    static readonly typeName = "buf.alpha.registry.v1alpha1.GetCurrentUserSubjectResponse";
    static readonly fields: FieldList = proto3.util.newFieldList(() => [
        {no: 1, name: "subject", kind: "scalar", T: 9 /* ScalarType.STRING */},
    ]);

    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCurrentUserSubjectResponse {
        return new GetCurrentUserSubjectResponse().fromBinary(bytes, options);
    }

    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCurrentUserSubjectResponse {
        return new GetCurrentUserSubjectResponse().fromJson(jsonValue, options);
    }

    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCurrentUserSubjectResponse {
        return new GetCurrentUserSubjectResponse().fromJsonString(jsonString, options);
    }

    static equals(a: GetCurrentUserSubjectResponse | PlainMessage<GetCurrentUserSubjectResponse> | undefined, b: GetCurrentUserSubjectResponse | PlainMessage<GetCurrentUserSubjectResponse> | undefined): boolean {
        return proto3.util.equals(GetCurrentUserSubjectResponse, a, b);
    }

}


