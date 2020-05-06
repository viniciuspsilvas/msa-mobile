
import { BACKEND_URL } from 'react-native-dotenv'

import { Alert } from 'react-native';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: BACKEND_URL
});
 
const client = new ApolloClient({
  cache,
  link
});


export default client