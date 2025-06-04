import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
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

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($data: SignUpInput!) {
    signUp(data: $data) {
      id
      email
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const REFRESH_ACCESS_TOKEN_MUTATION = gql`
  mutation {
    refreshAccessToken
  }
`;
