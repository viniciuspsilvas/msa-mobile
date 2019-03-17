import React from 'react';
import  StorybookUIRoot from './storybook';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

        return StorybookUIRoot;
    }
}

