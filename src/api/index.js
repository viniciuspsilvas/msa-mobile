import { BACKEND_URL } from 'react-native-dotenv'
import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'

import { Alert } from 'react-native'

const httpLink = new createUploadLink({ uri: BACKEND_URL });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = "localStorage.getItem('token');" // TODO - trocar pelo Token

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const errorLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {

    if (graphQLErrors) {
   
      graphQLErrors.map(({ message }) => Alert.alert(message))
    }

    if (networkError) {
      switch (networkError.statusCode) {
        case 400:
        // TODO
        break;

        case 500:
        // TODO
        break;

        default:
          break;
      }

      Alert.alert(networkError.message)
    }
  })
])

const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false
  })
});

export default client