// 路由注册, 路径区分大小写
import React from 'react';
import { Text } from 'react-native';

noHeaderOption = (titleText) => {
    return ({ navigation }) => ({
        headerTitle: titleText,
        header: null,
    });
}

withHeaderOption = (titleText) => {
    return ({ navigation }) => ({
        headerTitle: titleText,
        headerStyle: {
            backgroundColor: 'white',
            height: 45
        },
        headerTitleStyle: {
            alignSelf: 'center'  //居左flex-start , 居中center
        },
        headerTintColor: 'black',
        headerRight: <Text></Text>,
    });
}

withHeaderNoLeft = (titleText) => {
    return ({ navigation }) => ({
        headerTitle: titleText,
        headerStyle: {
            backgroundColor: 'white',
            height: 45
        },
        headerTitleStyle: {
            alignSelf: 'center',  //居左flex-start , 居中center
            textAlign: 'center',
        },
        headerTintColor: 'black',
        headerRight: <Text></Text>,
        headerLeft: <Text></Text>,
    });
}

module.exports = {
    Routers: [
        {
            name: 'login',
            module: require('../views/login'),
            option: noHeaderOption("登录"),
        },
        {
            name: 'home',
            module: require('../views/home'),
            option: noHeaderOption("主页"),
        },
        {
            name: 'detail',
            module: require('../views/details/details'),
            option: noHeaderOption("详情页"),
        },
    ],
}
