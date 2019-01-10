import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Platform, Dimensions, NativeModules, NativeEventEmitter } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
// import SplashScreen from 'react-native-splash-screen'

// import Http from "./utils/http";
import Storage from "./utils/storage";

const toLogin = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'login' })
    ]
});

const toHome = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'home' })
    ]
});

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.nav = this.props.navigation.navigate;
    }

    componentDidMount() {
        this.start()
    }

    componentWillUnmount() {
    }

    start = () => {
        //正式版(记住密码)
        // SplashScreen.hide();
        this.props.navigation.dispatch(toLogin);
        // Storage.Get("UserInfo").then((data) => {
        //     if (data == null) {
        //         this.props.navigation.dispatch(toLogin);
        //     }
            // else {
            //     var token = JSON.parse(data);
            //     var expiresTime = new Date(token['expires_time']);      //过期时间  TODO  当前时间>过期时间  时刷新token
            //     if (new Date() > expiresTime) {
            //         this.props.navigation.dispatch(toLogin);
            //     }
            //     else {
            //         Http.AccessToken = token.access_token;
            //         this.props.navigation.dispatch(toHome);
            //     }
            // }
        // })
    }

    render() {
        return (
            <View style={styles.container} >
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    img: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        resizeMode: 'cover',
    },
    txt: {
        width: Dimensions.get("window").width,
        height: 50,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: Dimensions.get("window").height / 10 * 8,
    }
});