import { BACKEND_URL } from 'react-native-dotenv'
import { AsyncStorage } from 'react-native';
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { Alert } from 'react-native'

const httpLink = createHttpLink({ uri: BACKEND_URL });
const authLink = setContext(async (_, { headers }) => {

  const student = JSON.parse(await AsyncStorage.getItem('STUDENT_MSA'))
  if (student && student.token) {
    return {
      headers: {
        ...headers,
        "Authorization": student.token
      }
    };
  } else {
    return {
      headers: { ...headers }
    };
  }
});

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      Alert.alert(message);
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    });
  if (networkError) {
    Alert.alert(networkError);
    console.log(`[Network error]: ${networkError}`)
  };
});

const client = new ApolloClient({
  link: authLink.concat(link).concat(httpLink),
  cache: new InMemoryCache()
});

export default client;