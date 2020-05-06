import React from 'react';
import { Text } from 'react-native';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

import { NavigationContainer } from '@react-navigation/native';

import client from './src/api'
import { VERSION_API } from './src/api/configAPI'

import AppNavigation from './src/app/AppNavigation'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </ApolloProvider>
  );
}

const MyVersion = () => {

  const { loading, error, data } = useQuery(VERSION_API);

  if (error) {
    console.log("error => ", error)
  }


  return (<Text>{data && data.version}</Text>)

}