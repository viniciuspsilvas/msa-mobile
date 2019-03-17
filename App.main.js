
import React from 'react';
import { Text, Button } from 'react-native';
import AppNavigation from './app/AppNavigation'

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import rootReducer from "./rootReducer";

const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk, logger)
));

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            user: {},
            isLoading: true
        };
    }

    // Workaround to solve the problem related to font 'Roboto_medium'
    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });

        this.setState({ isLoading: false });
    }

    render() {

        if (this.state.isLoading) {
            return <Expo.AppLoading />;
        }

        return (
            <Provider store={store}>
                <AppNavigation />
            </Provider>
        );
    }
}

