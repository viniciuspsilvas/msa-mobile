import React from "react";
import { Header, Body, Title, Left, Icon} from 'native-base'
import Expo from "expo";

export default class CustomHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    console.log(this.props);
    return (
        <Header>
            <Left><Icon name="menu" onPress={() => this.props.drawerOpen8()} /></Left>
            <Body>
                <Title>Olaaa</Title>
            </Body>
        </Header>
    );
  }
}