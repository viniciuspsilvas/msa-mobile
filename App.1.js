import React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet } from 'react-native';
import { DrawerItems, createDrawerNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Header, Left, Right, Icon } from 'native-base';

// const {width} = Dimensions.get('window');
        
const styles = StyleSheet.create({
    container:{
        flex: 1,
    }       
});

class HomeScreen extends React.Component {

    static navigationOptions = {
        drawerIcon : ({tintColor}) => (
            <Icon name='home' style={{fontSize:24, color: tintColor}} />
        ) 
    }

    render() {
        return (
            <View style={styles.container}>
                <Header noLeft>
                    <Left> 
                        <Icon name="menu" 
                            onPress={() => this.props.navigation.openDrawer()}/> 
                    </Left>
                </Header>

                <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>  
                    <Text>Home Screen</Text>
                </View>
                
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
            </View>
        );
    }
}

const CustomDrawerComponent = (props) => (

    <SafeAreaView style={{ flex: 1 }} >
        <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./assets/icon.png')} style={{ height: 120, width: 120, borderRadius: 60 }}>
            </Image>
        </View>

        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
)

const CustomDrawerContentComponent = (props) => (
    <ScrollView>

        <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./assets/icon.png')} style={{ height: 120, width: 120, borderRadius: 60 }}>
            </Image>
        </View>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );

const RootStack = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Details: {
            screen: DetailsScreen,
        },
    },
    {
        initialRouteName: 'Home',
        contentComponent: CustomDrawerContentComponent,
        // drawerWidth: width,
        activeTintColor: '#e91e63',
        itemsContainerStyle: {
          marginVertical: 0,
        },
        iconContainerStyle: {
          opacity: 1
        }
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack />;
        
    }
}