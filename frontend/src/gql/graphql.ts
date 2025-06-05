/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type BoardIdInput = {
  boardId: Scalars['Int']['input'];
};

export type BoardMemberType = {
  __typename?: 'BoardMemberType';
  board: BoardType;
  boardId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  joinedAt: Scalars['DateTime']['output'];
  role: BoardRole;
  user: UserType;
  userId: Scalars['Int']['output'];
};

export enum BoardRole {
  Guest = 'GUEST',
  Member = 'MEMBER',
  Owner = 'OWNER'
}

export type BoardType = {
  __typename?: 'BoardType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  lists: Array<ListType>;
  members: Array<BoardMemberType>;
  owner: UserType;
  ownerId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CardType = {
  __typename?: 'CardType';
  assignees: Array<UserType>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  listId: Scalars['Int']['output'];
  position: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateBoardInput = {
  title: Scalars['String']['input'];
};

export type CreateBoardMemberInput = {
  boardId: Scalars['Int']['input'];
  role?: InputMaybe<BoardRole>;
  userId: Scalars['Int']['input'];
};

export type CreateCardInput = {
  assigneeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  boardId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  listId: Scalars['Int']['input'];
  position: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreateListInput = {
  boardId: Scalars['Int']['input'];
  position: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type DeleteCardInput = {
  boardId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};

export type DeleteListInput = {
  boardId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};

export type GetCardsInput = {
  boardId: Scalars['Int']['input'];
  listId: Scalars['Int']['input'];
};

export type ListType = {
  __typename?: 'ListType';
  boardId: Scalars['Int']['output'];
  cards: Array<CardType>;
  id: Scalars['Int']['output'];
  position: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBoardMember: BoardMemberType;
  createBoard: BoardType;
  createCard: CardType;
  createList: ListType;
  deleteBoard: Scalars['Boolean']['output'];
  deleteCard: Scalars['Boolean']['output'];
  deleteList: Scalars['Boolean']['output'];
  login: UserAuthType;
  logout: Scalars['Boolean']['output'];
  refreshAccessToken: Scalars['String']['output'];
  removeBoardMember: Scalars['Boolean']['output'];
  signUp: UserType;
  transferOwnership: BoardType;
  updateBoard: BoardType;
  updateBoardMember: BoardMemberType;
  updateCard: CardType;
  updateList: ListType;
};


export type MutationAddBoardMemberArgs = {
  data: CreateBoardMemberInput;
};


export type MutationCreateBoardArgs = {
  data: CreateBoardInput;
};


export type MutationCreateCardArgs = {
  data: CreateCardInput;
};


export type MutationCreateListArgs = {
  data: CreateListInput;
};


export type MutationDeleteBoardArgs = {
  data: BoardIdInput;
};


export type MutationDeleteCardArgs = {
  data: DeleteCardInput;
};


export type MutationDeleteListArgs = {
  data: DeleteListInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRemoveBoardMemberArgs = {
  boardId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationSignUpArgs = {
  data: SignUpInput;
};


export type MutationTransferOwnershipArgs = {
  data: TransferOwnershipInput;
};


export type MutationUpdateBoardArgs = {
  data: UpdateBoardInput;
};


export type MutationUpdateBoardMemberArgs = {
  data: UpdateBoardMemberInput;
};


export type MutationUpdateCardArgs = {
  data: UpdateCardInput;
};


export type MutationUpdateListArgs = {
  data: UpdateListInput;
};

export type Query = {
  __typename?: 'Query';
  board: BoardType;
  getBoardMembers: Array<BoardMemberType>;
  getCardsByListId: Array<CardType>;
  getListsByBoard: Array<ListType>;
  getUser: UserType;
  healthCheck: Scalars['String']['output'];
  me: UserType;
};


export type QueryBoardArgs = {
  data: BoardIdInput;
};


export type QueryGetBoardMembersArgs = {
  boardId: Scalars['Int']['input'];
};


export type QueryGetCardsByListIdArgs = {
  data: GetCardsInput;
};


export type QueryGetListsByBoardArgs = {
  data: BoardIdInput;
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type TransferOwnershipInput = {
  boardId: Scalars['Int']['input'];
  newOwnerId: Scalars['Int']['input'];
};

export type UpdateBoardInput = {
  boardId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBoardMemberInput = {
  boardId: Scalars['Int']['input'];
  role: BoardRole;
  userId: Scalars['Int']['input'];
};

export type UpdateCardInput = {
  assigneeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  boardId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Int']['input'];
  listId?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateListInput = {
  boardId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UserAuthType = {
  __typename?: 'UserAuthType';
  accessToken: Scalars['String']['output'];
  user: UserType;
};

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserAuthType', accessToken: string, user: { __typename?: 'UserType', id: number, email: string } } };

export type SignUpMutationVariables = Exact<{
  data: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'UserType', id: number, email: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RefreshAccessTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshAccessTokenMutation = { __typename?: 'Mutation', refreshAccessToken: string };

export type HealthCheckQueryVariables = Exact<{ [key: string]: never; }>;


export type HealthCheckQuery = { __typename?: 'Query', healthCheck: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserType', id: number, email: string } };

export type CreateBoardMutationVariables = Exact<{
  data: CreateBoardInput;
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'BoardType', id: number, title: string, ownerId: number } };

export type GetBoardByIdQueryVariables = Exact<{
  data: BoardIdInput;
}>;


export type GetBoardByIdQuery = { __typename?: 'Query', board: { __typename?: 'BoardType', id: number, title: string, ownerId: number, createdAt: any, updatedAt: any, owner: { __typename?: 'UserType', id: number, email: string }, members: Array<{ __typename?: 'BoardMemberType', id: number, role: BoardRole, user: { __typename?: 'UserType', id: number, email: string } }>, lists: Array<{ __typename?: 'ListType', id: number, title: string }> } };

export type UpdateBoardMutationVariables = Exact<{
  data: UpdateBoardInput;
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard: { __typename?: 'BoardType', id: number, title: string } };

export type DeleteBoardMutationVariables = Exact<{
  data: BoardIdInput;
}>;


export type DeleteBoardMutation = { __typename?: 'Mutation', deleteBoard: boolean };

export type TransferOwnershipMutationVariables = Exact<{
  data: TransferOwnershipInput;
}>;


export type TransferOwnershipMutation = { __typename?: 'Mutation', transferOwnership: { __typename?: 'BoardType', id: number, ownerId: number } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshAccessToken"}}]}}]} as unknown as DocumentNode<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;
export const HealthCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HealthCheck"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"healthCheck"}}]}}]} as unknown as DocumentNode<HealthCheckQuery, HealthCheckQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const CreateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBoardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}}]}}]}}]} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
export const GetBoardByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBoardById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BoardIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"board"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetBoardByIdQuery, GetBoardByIdQueryVariables>;
export const UpdateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBoardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const DeleteBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BoardIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const TransferOwnershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TransferOwnership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransferOwnershipInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transferOwnership"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}}]}}]}}]} as unknown as DocumentNode<TransferOwnershipMutation, TransferOwnershipMutationVariables>;