/* eslint-disable */
// @generated by protoc-gen-connectweb v0.0.1 with parameter "ts_nocheck=false"
// @generated from file buf/alpha/registry/v1alpha1/user.proto (package buf.alpha.registry.v1alpha1, syntax proto3)

import {MethodKind, proto3} from "@bufbuild/protobuf";
import {CountUsersRequest, CountUsersResponse, CreateUserRequest, CreateUserResponse, DeactivateUserRequest, DeactivateUserResponse, DeleteUserRequest, DeleteUserResponse, GetUserByUsernameRequest, GetUserByUsernameResponse, GetUserRequest, GetUserResponse, ListOrganizationUsersRequest, ListOrganizationUsersResponse, ListUsersRequest, ListUsersResponse, UpdateUserServerRoleRequest, UpdateUserServerRoleResponse} from "./user_pb.js";

// ## Service UserService
// Generated from service buf.alpha.registry.v1alpha1.UserService
export const UserService = proto3.makeServiceType({
    typeName: "buf.alpha.registry.v1alpha1.UserService",
    methods: {
        createUser: {
            name: "CreateUser",
            I: CreateUserRequest,
            O: CreateUserResponse,
            kind: MethodKind.Unary,
        },
        getUser: {
            name: "GetUser",
            I: GetUserRequest,
            O: GetUserResponse,
            kind: MethodKind.Unary,
        },
        getUserByUsername: {
            name: "GetUserByUsername",
            I: GetUserByUsernameRequest,
            O: GetUserByUsernameResponse,
            kind: MethodKind.Unary,
        },
        listUsers: {
            name: "ListUsers",
            I: ListUsersRequest,
            O: ListUsersResponse,
            kind: MethodKind.Unary,
        },
        listOrganizationUsers: {
            name: "ListOrganizationUsers",
            I: ListOrganizationUsersRequest,
            O: ListOrganizationUsersResponse,
            kind: MethodKind.Unary,
        },
        deleteUser: {
            name: "DeleteUser",
            I: DeleteUserRequest,
            O: DeleteUserResponse,
            kind: MethodKind.Unary,
        },
        deactivateUser: {
            name: "DeactivateUser",
            I: DeactivateUserRequest,
            O: DeactivateUserResponse,
            kind: MethodKind.Unary,
        },
        updateUserServerRole: {
            name: "UpdateUserServerRole",
            I: UpdateUserServerRoleRequest,
            O: UpdateUserServerRoleResponse,
            kind: MethodKind.Unary,
        },
        countUsers: {
            name: "CountUsers",
            I: CountUsersRequest,
            O: CountUsersResponse,
            kind: MethodKind.Unary,
        },
    }
});
