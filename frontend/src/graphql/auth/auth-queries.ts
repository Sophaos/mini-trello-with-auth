import { gql } from "@apollo/client";

export const HEALTH_CHECK_QUERY = gql`
  query {
    healthCheck
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      emailVerified
    }
  }
`;
