
import React from 'react';

//AppNavigation
import AppNavigation from './app/AppNavigation'

//Redux
import { store, persistor } from './src/redux/configureStore'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Storybook
import { IS_STORYBOOK_ENABLED } from 'react-native-dotenv'
import StorybookUIRoot from './storybook';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    // Workaround to solve a bug related with the font 'Roboto_medium'
    async componentWillMount() {
     /*]   await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        }); */

        this.setState({ isLoading: false });
    }

    render() {

        if (this.state.isLoading) {
            return <Expo.AppLoading />;
        }

        return (
            <Provider store={store}>
                {IS_STORYBOOK_ENABLED === "true" ? (
                    <StorybookUIRoot />
                ) : (
                        <PersistGate loading={null} persistor={persistor}>
                            <AppNavigation />
                        </PersistGate>
                    )}
            </Provider>
        );
    }
}

