import React from 'react';
//AppNavigation
import AppNavigation from './app/AppNavigation'

//Redux
import { store, persistor } from './src/redux/configureStore'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Storybook
import { IS_STORYBOOK_ENABLED } from 'react-native-dotenv'
//import StorybookUIRoot from './storybook';


export default function App() {
  return (
    <Provider store={store}>
      {IS_STORYBOOK_ENABLED === "true" ? (
      {/*    <StorybookUIRoot /> */}
      ) : (
              <PersistGate loading={null} persistor={persistor}>
                  <AppNavigation />
              </PersistGate>
      )}
    </Provider>
  );
}