/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    accessToken\n    user {\n      id\n      email\n    }\n  }\n}\n\nmutation SignUp($data: SignUpInput!) {\n  signUp(data: $data) {\n    id\n    email\n  }\n}\n\nmutation Logout {\n  logout\n}\n\nmutation RefreshAccessToken {\n  refreshAccessToken\n}\n\nquery HealthCheck {\n  healthCheck\n}\n\nquery Me {\n  me {\n    id\n    email\n  }\n}": typeof types.LoginDocument,
    "mutation CreateBoard($data: CreateBoardInput!) {\n  createBoard(data: $data) {\n    id\n    title\n    ownerId\n  }\n}\n\nquery GetBoardById($data: BoardIdInput!) {\n  board(data: $data) {\n    id\n    title\n    ownerId\n    owner {\n      id\n      email\n    }\n    members {\n      id\n      role\n      user {\n        id\n        email\n      }\n    }\n    lists {\n      id\n      title\n    }\n    createdAt\n    updatedAt\n  }\n}\n\nmutation UpdateBoard($data: UpdateBoardInput!) {\n  updateBoard(data: $data) {\n    id\n    title\n  }\n}\n\nmutation DeleteBoard($data: BoardIdInput!) {\n  deleteBoard(data: $data)\n}\n\nmutation TransferOwnership($data: TransferOwnershipInput!) {\n  transferOwnership(data: $data) {\n    id\n    ownerId\n  }\n}": typeof types.CreateBoardDocument,
};
const documents: Documents = {
    "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    accessToken\n    user {\n      id\n      email\n    }\n  }\n}\n\nmutation SignUp($data: SignUpInput!) {\n  signUp(data: $data) {\n    id\n    email\n  }\n}\n\nmutation Logout {\n  logout\n}\n\nmutation RefreshAccessToken {\n  refreshAccessToken\n}\n\nquery HealthCheck {\n  healthCheck\n}\n\nquery Me {\n  me {\n    id\n    email\n  }\n}": types.LoginDocument,
    "mutation CreateBoard($data: CreateBoardInput!) {\n  createBoard(data: $data) {\n    id\n    title\n    ownerId\n  }\n}\n\nquery GetBoardById($data: BoardIdInput!) {\n  board(data: $data) {\n    id\n    title\n    ownerId\n    owner {\n      id\n      email\n    }\n    members {\n      id\n      role\n      user {\n        id\n        email\n      }\n    }\n    lists {\n      id\n      title\n    }\n    createdAt\n    updatedAt\n  }\n}\n\nmutation UpdateBoard($data: UpdateBoardInput!) {\n  updateBoard(data: $data) {\n    id\n    title\n  }\n}\n\nmutation DeleteBoard($data: BoardIdInput!) {\n  deleteBoard(data: $data)\n}\n\nmutation TransferOwnership($data: TransferOwnershipInput!) {\n  transferOwnership(data: $data) {\n    id\n    ownerId\n  }\n}": types.CreateBoardDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    accessToken\n    user {\n      id\n      email\n    }\n  }\n}\n\nmutation SignUp($data: SignUpInput!) {\n  signUp(data: $data) {\n    id\n    email\n  }\n}\n\nmutation Logout {\n  logout\n}\n\nmutation RefreshAccessToken {\n  refreshAccessToken\n}\n\nquery HealthCheck {\n  healthCheck\n}\n\nquery Me {\n  me {\n    id\n    email\n  }\n}"): (typeof documents)["mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    accessToken\n    user {\n      id\n      email\n    }\n  }\n}\n\nmutation SignUp($data: SignUpInput!) {\n  signUp(data: $data) {\n    id\n    email\n  }\n}\n\nmutation Logout {\n  logout\n}\n\nmutation RefreshAccessToken {\n  refreshAccessToken\n}\n\nquery HealthCheck {\n  healthCheck\n}\n\nquery Me {\n  me {\n    id\n    email\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateBoard($data: CreateBoardInput!) {\n  createBoard(data: $data) {\n    id\n    title\n    ownerId\n  }\n}\n\nquery GetBoardById($data: BoardIdInput!) {\n  board(data: $data) {\n    id\n    title\n    ownerId\n    owner {\n      id\n      email\n    }\n    members {\n      id\n      role\n      user {\n        id\n        email\n      }\n    }\n    lists {\n      id\n      title\n    }\n    createdAt\n    updatedAt\n  }\n}\n\nmutation UpdateBoard($data: UpdateBoardInput!) {\n  updateBoard(data: $data) {\n    id\n    title\n  }\n}\n\nmutation DeleteBoard($data: BoardIdInput!) {\n  deleteBoard(data: $data)\n}\n\nmutation TransferOwnership($data: TransferOwnershipInput!) {\n  transferOwnership(data: $data) {\n    id\n    ownerId\n  }\n}"): (typeof documents)["mutation CreateBoard($data: CreateBoardInput!) {\n  createBoard(data: $data) {\n    id\n    title\n    ownerId\n  }\n}\n\nquery GetBoardById($data: BoardIdInput!) {\n  board(data: $data) {\n    id\n    title\n    ownerId\n    owner {\n      id\n      email\n    }\n    members {\n      id\n      role\n      user {\n        id\n        email\n      }\n    }\n    lists {\n      id\n      title\n    }\n    createdAt\n    updatedAt\n  }\n}\n\nmutation UpdateBoard($data: UpdateBoardInput!) {\n  updateBoard(data: $data) {\n    id\n    title\n  }\n}\n\nmutation DeleteBoard($data: BoardIdInput!) {\n  deleteBoard(data: $data)\n}\n\nmutation TransferOwnership($data: TransferOwnershipInput!) {\n  transferOwnership(data: $data) {\n    id\n    ownerId\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;