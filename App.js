import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigation from './src/app/AppNavigation'
import { AppContextProvider } from './src/app/AppContextProvider'

import client from './src/api'

export default function App() {
  return (
    <AppContextProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </ApolloProvider>
    </AppContextProvider>
  );
}