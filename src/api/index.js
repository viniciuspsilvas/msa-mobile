import { BACKEND_URL } from 'react-native-dotenv'
import { AsyncStorage } from 'react-native';
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { Alert } from 'react-native'
import packageJson from '../../package.json';

const TOKEN_LOCAL_STORE = `${packageJson.name}-token`;
const httpLink = createHttpLink({ uri: BACKEND_URL });

const authLink = setContext(async (_, { headers }) => {
  const localStore = await AsyncStorage.getItem(TOKEN_LOCAL_STORE); // TODO alterar para pegar o token do usuario
 
  console.log("#localStore 4", localStore)
  const tokens = JSON.parse(localStore)

  console.log("#tokens 2", tokens)

  return {
    headers: {
      ...headers,
      "Authorization": tokens && tokens.tokenStudent || null
    }
  };
});


const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => Alert.alert(message))
  }

  if (!graphQLErrors && networkError) {
    Alert.alert(networkError.message)
    if (networkError.statusCode === 401) {
      AsyncStorage.removeItem(TOKEN_LOCAL_STORE)
    }
  }
  console.log(`[Network error]: ${networkError}`, `[graphQLErrors]: ${JSON.stringify(graphQLErrors)}`)
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const client = new ApolloClient({
  link: authLink.concat(link).concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false
  }),
  defaultOptions: defaultOptions
});

export default client;