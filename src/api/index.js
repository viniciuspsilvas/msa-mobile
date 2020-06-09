import { BACKEND_URL } from 'react-native-dotenv'
import { AsyncStorage } from 'react-native';
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;