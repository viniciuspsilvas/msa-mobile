import gql from 'graphql-tag'

export const VERSION_API = gql`
  query version {
    version
  }
`;