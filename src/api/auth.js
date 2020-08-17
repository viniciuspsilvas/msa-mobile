import gql from 'graphql-tag'

export const AUTHENTICATE = gql`
  query authenticate($filter: AuthInput!) {
    authenticate(filter: $filter)
  }
`;

export const VALIDATE_TOKEN = gql`
  query validateToken($token: String) {
    validateToken(token: $token)
  }
`;