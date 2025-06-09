import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
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

export type FindListByIdInput = {
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

export type MoveCardInput = {
  boardId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  newPosition: Scalars['Int']['input'];
};

export type MoveListInput = {
  boardId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  newPosition: Scalars['Int']['input'];
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
  moveCard: Array<CardType>;
  moveList: Array<ListType>;
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


export type MutationMoveCardArgs = {
  data: MoveCardInput;
};


export type MutationMoveListArgs = {
  data: MoveListInput;
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
  getListsById: Array<ListType>;
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


export type QueryGetListsByIdArgs = {
  data: FindListByIdInput;
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

export type GetBoardMembersQueryVariables = Exact<{
  boardId: Scalars['Int']['input'];
}>;


export type GetBoardMembersQuery = { __typename?: 'Query', getBoardMembers: Array<{ __typename?: 'BoardMemberType', id: number, userId: number, boardId: number, role: BoardRole, joinedAt: any, user: { __typename?: 'UserType', id: number, email: string }, board: { __typename?: 'BoardType', id: number, title: string } }> };

export type AddBoardMemberMutationVariables = Exact<{
  data: CreateBoardMemberInput;
}>;


export type AddBoardMemberMutation = { __typename?: 'Mutation', addBoardMember: { __typename?: 'BoardMemberType', id: number, userId: number, boardId: number, role: BoardRole, joinedAt: any, user: { __typename?: 'UserType', id: number, email: string } } };

export type UpdateBoardMemberMutationVariables = Exact<{
  data: UpdateBoardMemberInput;
}>;


export type UpdateBoardMemberMutation = { __typename?: 'Mutation', updateBoardMember: { __typename?: 'BoardMemberType', id: number, userId: number, boardId: number, role: BoardRole, joinedAt: any } };

export type RemoveBoardMemberMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  boardId: Scalars['Int']['input'];
}>;


export type RemoveBoardMemberMutation = { __typename?: 'Mutation', removeBoardMember: boolean };

export type CreateBoardMutationVariables = Exact<{
  data: CreateBoardInput;
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'BoardType', id: number, title: string, ownerId: number, createdAt: any, updatedAt: any, owner: { __typename?: 'UserType', id: number, email: string }, members: Array<{ __typename?: 'BoardMemberType', id: number, role: BoardRole, user: { __typename?: 'UserType', id: number, email: string } }>, lists: Array<{ __typename?: 'ListType', id: number, title: string }> } };

export type GetBoardByIdQueryVariables = Exact<{
  data: BoardIdInput;
}>;


export type GetBoardByIdQuery = { __typename?: 'Query', board: { __typename?: 'BoardType', id: number, title: string, ownerId: number, createdAt: any, updatedAt: any, owner: { __typename?: 'UserType', id: number, email: string }, members: Array<{ __typename?: 'BoardMemberType', id: number, role: BoardRole, user: { __typename?: 'UserType', id: number, email: string } }>, lists: Array<{ __typename?: 'ListType', id: number, title: string }> } };

export type UpdateBoardMutationVariables = Exact<{
  data: UpdateBoardInput;
}>;


export type UpdateBoardMutation = { __typename?: 'Mutation', updateBoard: { __typename?: 'BoardType', id: number, title: string, updatedAt: any } };

export type DeleteBoardMutationVariables = Exact<{
  data: BoardIdInput;
}>;


export type DeleteBoardMutation = { __typename?: 'Mutation', deleteBoard: boolean };

export type TransferOwnershipMutationVariables = Exact<{
  data: TransferOwnershipInput;
}>;


export type TransferOwnershipMutation = { __typename?: 'Mutation', transferOwnership: { __typename?: 'BoardType', id: number, ownerId: number, owner: { __typename?: 'UserType', id: number, email: string } } };

export type CreateListMutationVariables = Exact<{
  data: CreateListInput;
}>;


export type CreateListMutation = { __typename?: 'Mutation', createList: { __typename?: 'ListType', id: number, title: string, position: number, boardId: number, cards: Array<{ __typename?: 'CardType', id: number, title: string }> } };

export type UpdateListMutationVariables = Exact<{
  data: UpdateListInput;
}>;


export type UpdateListMutation = { __typename?: 'Mutation', updateList: { __typename?: 'ListType', id: number, title: string, position: number } };

export type DeleteListMutationVariables = Exact<{
  data: DeleteListInput;
}>;


export type DeleteListMutation = { __typename?: 'Mutation', deleteList: boolean };

export type MoveListMutationVariables = Exact<{
  data: MoveListInput;
}>;


export type MoveListMutation = { __typename?: 'Mutation', moveList: Array<{ __typename?: 'ListType', id: number, title: string, position: number, boardId: number }> };


export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    accessToken
    user {
      id
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($data: SignUpInput!) {
  signUp(data: $data) {
    id
    email
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshAccessTokenDocument = gql`
    mutation RefreshAccessToken {
  refreshAccessToken
}
    `;
export type RefreshAccessTokenMutationFn = Apollo.MutationFunction<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;

/**
 * __useRefreshAccessTokenMutation__
 *
 * To run a mutation, you first call `useRefreshAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAccessTokenMutation, { data, loading, error }] = useRefreshAccessTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshAccessTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>(RefreshAccessTokenDocument, options);
      }
export type RefreshAccessTokenMutationHookResult = ReturnType<typeof useRefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationResult = Apollo.MutationResult<RefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationOptions = Apollo.BaseMutationOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;
export const HealthCheckDocument = gql`
    query HealthCheck {
  healthCheck
}
    `;

/**
 * __useHealthCheckQuery__
 *
 * To run a query within a React component, call `useHealthCheckQuery` and pass it any options that fit your needs.
 * When your component renders, `useHealthCheckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHealthCheckQuery({
 *   variables: {
 *   },
 * });
 */
export function useHealthCheckQuery(baseOptions?: Apollo.QueryHookOptions<HealthCheckQuery, HealthCheckQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HealthCheckQuery, HealthCheckQueryVariables>(HealthCheckDocument, options);
      }
export function useHealthCheckLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HealthCheckQuery, HealthCheckQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HealthCheckQuery, HealthCheckQueryVariables>(HealthCheckDocument, options);
        }
export function useHealthCheckSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HealthCheckQuery, HealthCheckQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HealthCheckQuery, HealthCheckQueryVariables>(HealthCheckDocument, options);
        }
export type HealthCheckQueryHookResult = ReturnType<typeof useHealthCheckQuery>;
export type HealthCheckLazyQueryHookResult = ReturnType<typeof useHealthCheckLazyQuery>;
export type HealthCheckSuspenseQueryHookResult = ReturnType<typeof useHealthCheckSuspenseQuery>;
export type HealthCheckQueryResult = Apollo.QueryResult<HealthCheckQuery, HealthCheckQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetBoardMembersDocument = gql`
    query GetBoardMembers($boardId: Int!) {
  getBoardMembers(boardId: $boardId) {
    id
    userId
    boardId
    role
    joinedAt
    user {
      id
      email
    }
    board {
      id
      title
    }
  }
}
    `;

/**
 * __useGetBoardMembersQuery__
 *
 * To run a query within a React component, call `useGetBoardMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardMembersQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetBoardMembersQuery(baseOptions: Apollo.QueryHookOptions<GetBoardMembersQuery, GetBoardMembersQueryVariables> & ({ variables: GetBoardMembersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardMembersQuery, GetBoardMembersQueryVariables>(GetBoardMembersDocument, options);
      }
export function useGetBoardMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardMembersQuery, GetBoardMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardMembersQuery, GetBoardMembersQueryVariables>(GetBoardMembersDocument, options);
        }
export function useGetBoardMembersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBoardMembersQuery, GetBoardMembersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBoardMembersQuery, GetBoardMembersQueryVariables>(GetBoardMembersDocument, options);
        }
export type GetBoardMembersQueryHookResult = ReturnType<typeof useGetBoardMembersQuery>;
export type GetBoardMembersLazyQueryHookResult = ReturnType<typeof useGetBoardMembersLazyQuery>;
export type GetBoardMembersSuspenseQueryHookResult = ReturnType<typeof useGetBoardMembersSuspenseQuery>;
export type GetBoardMembersQueryResult = Apollo.QueryResult<GetBoardMembersQuery, GetBoardMembersQueryVariables>;
export const AddBoardMemberDocument = gql`
    mutation AddBoardMember($data: CreateBoardMemberInput!) {
  addBoardMember(data: $data) {
    id
    userId
    boardId
    role
    joinedAt
    user {
      id
      email
    }
  }
}
    `;
export type AddBoardMemberMutationFn = Apollo.MutationFunction<AddBoardMemberMutation, AddBoardMemberMutationVariables>;

/**
 * __useAddBoardMemberMutation__
 *
 * To run a mutation, you first call `useAddBoardMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBoardMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBoardMemberMutation, { data, loading, error }] = useAddBoardMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddBoardMemberMutation(baseOptions?: Apollo.MutationHookOptions<AddBoardMemberMutation, AddBoardMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBoardMemberMutation, AddBoardMemberMutationVariables>(AddBoardMemberDocument, options);
      }
export type AddBoardMemberMutationHookResult = ReturnType<typeof useAddBoardMemberMutation>;
export type AddBoardMemberMutationResult = Apollo.MutationResult<AddBoardMemberMutation>;
export type AddBoardMemberMutationOptions = Apollo.BaseMutationOptions<AddBoardMemberMutation, AddBoardMemberMutationVariables>;
export const UpdateBoardMemberDocument = gql`
    mutation UpdateBoardMember($data: UpdateBoardMemberInput!) {
  updateBoardMember(data: $data) {
    id
    userId
    boardId
    role
    joinedAt
  }
}
    `;
export type UpdateBoardMemberMutationFn = Apollo.MutationFunction<UpdateBoardMemberMutation, UpdateBoardMemberMutationVariables>;

/**
 * __useUpdateBoardMemberMutation__
 *
 * To run a mutation, you first call `useUpdateBoardMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardMemberMutation, { data, loading, error }] = useUpdateBoardMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBoardMemberMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardMemberMutation, UpdateBoardMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardMemberMutation, UpdateBoardMemberMutationVariables>(UpdateBoardMemberDocument, options);
      }
export type UpdateBoardMemberMutationHookResult = ReturnType<typeof useUpdateBoardMemberMutation>;
export type UpdateBoardMemberMutationResult = Apollo.MutationResult<UpdateBoardMemberMutation>;
export type UpdateBoardMemberMutationOptions = Apollo.BaseMutationOptions<UpdateBoardMemberMutation, UpdateBoardMemberMutationVariables>;
export const RemoveBoardMemberDocument = gql`
    mutation RemoveBoardMember($userId: Int!, $boardId: Int!) {
  removeBoardMember(userId: $userId, boardId: $boardId)
}
    `;
export type RemoveBoardMemberMutationFn = Apollo.MutationFunction<RemoveBoardMemberMutation, RemoveBoardMemberMutationVariables>;

/**
 * __useRemoveBoardMemberMutation__
 *
 * To run a mutation, you first call `useRemoveBoardMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBoardMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBoardMemberMutation, { data, loading, error }] = useRemoveBoardMemberMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useRemoveBoardMemberMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBoardMemberMutation, RemoveBoardMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBoardMemberMutation, RemoveBoardMemberMutationVariables>(RemoveBoardMemberDocument, options);
      }
export type RemoveBoardMemberMutationHookResult = ReturnType<typeof useRemoveBoardMemberMutation>;
export type RemoveBoardMemberMutationResult = Apollo.MutationResult<RemoveBoardMemberMutation>;
export type RemoveBoardMemberMutationOptions = Apollo.BaseMutationOptions<RemoveBoardMemberMutation, RemoveBoardMemberMutationVariables>;
export const CreateBoardDocument = gql`
    mutation CreateBoard($data: CreateBoardInput!) {
  createBoard(data: $data) {
    id
    title
    ownerId
    createdAt
    updatedAt
    owner {
      id
      email
    }
    members {
      id
      role
      user {
        id
        email
      }
    }
    lists {
      id
      title
    }
  }
}
    `;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, options);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const GetBoardByIdDocument = gql`
    query GetBoardById($data: BoardIdInput!) {
  board(data: $data) {
    id
    title
    ownerId
    createdAt
    updatedAt
    owner {
      id
      email
    }
    members {
      id
      role
      user {
        id
        email
      }
    }
    lists {
      id
      title
    }
  }
}
    `;

/**
 * __useGetBoardByIdQuery__
 *
 * To run a query within a React component, call `useGetBoardByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardByIdQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetBoardByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBoardByIdQuery, GetBoardByIdQueryVariables> & ({ variables: GetBoardByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardByIdQuery, GetBoardByIdQueryVariables>(GetBoardByIdDocument, options);
      }
export function useGetBoardByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardByIdQuery, GetBoardByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardByIdQuery, GetBoardByIdQueryVariables>(GetBoardByIdDocument, options);
        }
export function useGetBoardByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBoardByIdQuery, GetBoardByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBoardByIdQuery, GetBoardByIdQueryVariables>(GetBoardByIdDocument, options);
        }
export type GetBoardByIdQueryHookResult = ReturnType<typeof useGetBoardByIdQuery>;
export type GetBoardByIdLazyQueryHookResult = ReturnType<typeof useGetBoardByIdLazyQuery>;
export type GetBoardByIdSuspenseQueryHookResult = ReturnType<typeof useGetBoardByIdSuspenseQuery>;
export type GetBoardByIdQueryResult = Apollo.QueryResult<GetBoardByIdQuery, GetBoardByIdQueryVariables>;
export const UpdateBoardDocument = gql`
    mutation UpdateBoard($data: UpdateBoardInput!) {
  updateBoard(data: $data) {
    id
    title
    updatedAt
  }
}
    `;
export type UpdateBoardMutationFn = Apollo.MutationFunction<UpdateBoardMutation, UpdateBoardMutationVariables>;

/**
 * __useUpdateBoardMutation__
 *
 * To run a mutation, you first call `useUpdateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardMutation, { data, loading, error }] = useUpdateBoardMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBoardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardMutation, UpdateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(UpdateBoardDocument, options);
      }
export type UpdateBoardMutationHookResult = ReturnType<typeof useUpdateBoardMutation>;
export type UpdateBoardMutationResult = Apollo.MutationResult<UpdateBoardMutation>;
export type UpdateBoardMutationOptions = Apollo.BaseMutationOptions<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const DeleteBoardDocument = gql`
    mutation DeleteBoard($data: BoardIdInput!) {
  deleteBoard(data: $data)
}
    `;
export type DeleteBoardMutationFn = Apollo.MutationFunction<DeleteBoardMutation, DeleteBoardMutationVariables>;

/**
 * __useDeleteBoardMutation__
 *
 * To run a mutation, you first call `useDeleteBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardMutation, { data, loading, error }] = useDeleteBoardMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteBoardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBoardMutation, DeleteBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument, options);
      }
export type DeleteBoardMutationHookResult = ReturnType<typeof useDeleteBoardMutation>;
export type DeleteBoardMutationResult = Apollo.MutationResult<DeleteBoardMutation>;
export type DeleteBoardMutationOptions = Apollo.BaseMutationOptions<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const TransferOwnershipDocument = gql`
    mutation TransferOwnership($data: TransferOwnershipInput!) {
  transferOwnership(data: $data) {
    id
    ownerId
    owner {
      id
      email
    }
  }
}
    `;
export type TransferOwnershipMutationFn = Apollo.MutationFunction<TransferOwnershipMutation, TransferOwnershipMutationVariables>;

/**
 * __useTransferOwnershipMutation__
 *
 * To run a mutation, you first call `useTransferOwnershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferOwnershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferOwnershipMutation, { data, loading, error }] = useTransferOwnershipMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useTransferOwnershipMutation(baseOptions?: Apollo.MutationHookOptions<TransferOwnershipMutation, TransferOwnershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TransferOwnershipMutation, TransferOwnershipMutationVariables>(TransferOwnershipDocument, options);
      }
export type TransferOwnershipMutationHookResult = ReturnType<typeof useTransferOwnershipMutation>;
export type TransferOwnershipMutationResult = Apollo.MutationResult<TransferOwnershipMutation>;
export type TransferOwnershipMutationOptions = Apollo.BaseMutationOptions<TransferOwnershipMutation, TransferOwnershipMutationVariables>;
export const CreateListDocument = gql`
    mutation CreateList($data: CreateListInput!) {
  createList(data: $data) {
    id
    title
    position
    boardId
    cards {
      id
      title
    }
  }
}
    `;
export type CreateListMutationFn = Apollo.MutationFunction<CreateListMutation, CreateListMutationVariables>;

/**
 * __useCreateListMutation__
 *
 * To run a mutation, you first call `useCreateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListMutation, { data, loading, error }] = useCreateListMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateListMutation(baseOptions?: Apollo.MutationHookOptions<CreateListMutation, CreateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateListMutation, CreateListMutationVariables>(CreateListDocument, options);
      }
export type CreateListMutationHookResult = ReturnType<typeof useCreateListMutation>;
export type CreateListMutationResult = Apollo.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = Apollo.BaseMutationOptions<CreateListMutation, CreateListMutationVariables>;
export const UpdateListDocument = gql`
    mutation UpdateList($data: UpdateListInput!) {
  updateList(data: $data) {
    id
    title
    position
  }
}
    `;
export type UpdateListMutationFn = Apollo.MutationFunction<UpdateListMutation, UpdateListMutationVariables>;

/**
 * __useUpdateListMutation__
 *
 * To run a mutation, you first call `useUpdateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListMutation, { data, loading, error }] = useUpdateListMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateListMutation(baseOptions?: Apollo.MutationHookOptions<UpdateListMutation, UpdateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateListMutation, UpdateListMutationVariables>(UpdateListDocument, options);
      }
export type UpdateListMutationHookResult = ReturnType<typeof useUpdateListMutation>;
export type UpdateListMutationResult = Apollo.MutationResult<UpdateListMutation>;
export type UpdateListMutationOptions = Apollo.BaseMutationOptions<UpdateListMutation, UpdateListMutationVariables>;
export const DeleteListDocument = gql`
    mutation DeleteList($data: DeleteListInput!) {
  deleteList(data: $data)
}
    `;
export type DeleteListMutationFn = Apollo.MutationFunction<DeleteListMutation, DeleteListMutationVariables>;

/**
 * __useDeleteListMutation__
 *
 * To run a mutation, you first call `useDeleteListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListMutation, { data, loading, error }] = useDeleteListMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteListMutation, DeleteListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteListMutation, DeleteListMutationVariables>(DeleteListDocument, options);
      }
export type DeleteListMutationHookResult = ReturnType<typeof useDeleteListMutation>;
export type DeleteListMutationResult = Apollo.MutationResult<DeleteListMutation>;
export type DeleteListMutationOptions = Apollo.BaseMutationOptions<DeleteListMutation, DeleteListMutationVariables>;
export const MoveListDocument = gql`
    mutation MoveList($data: MoveListInput!) {
  moveList(data: $data) {
    id
    title
    position
    boardId
  }
}
    `;
export type MoveListMutationFn = Apollo.MutationFunction<MoveListMutation, MoveListMutationVariables>;

/**
 * __useMoveListMutation__
 *
 * To run a mutation, you first call `useMoveListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveListMutation, { data, loading, error }] = useMoveListMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMoveListMutation(baseOptions?: Apollo.MutationHookOptions<MoveListMutation, MoveListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveListMutation, MoveListMutationVariables>(MoveListDocument, options);
      }
export type MoveListMutationHookResult = ReturnType<typeof useMoveListMutation>;
export type MoveListMutationResult = Apollo.MutationResult<MoveListMutation>;
export type MoveListMutationOptions = Apollo.BaseMutationOptions<MoveListMutation, MoveListMutationVariables>;