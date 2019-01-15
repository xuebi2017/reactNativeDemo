/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component }from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from 'react-redux'

import ConfigureStore from './redux/store'
import { Routers } from './router/router';

let store = ConfigureStore();

//忽略黄色警告
console.disableYellowBox = true;

//获取当前路由
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
      return null;
  }
  let route = navigationState.routes[navigationState.index];
  if (route.routes) {
      return getCurrentRouteName(route);
  }
  return route.routeName;
}

//首页以及其他页面路由
let pages = {
  'main': {
      screen: require('./main').default,
      // screen: import main from './main',
      navigationOptions: ({ navigation }) => ({
          header: null
      }),
  }
}; 
Routers.map((component) => {
  pages[component.name] = {
      screen: component.module.default,
      navigationOptions: component.option
  };
});
console.log('pages',pages)

const AppNavigator = createStackNavigator(pages);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (<Provider store={store}>
        <AppContainer onNavigationStateChange={(prevState, curState) => {
          // console.log('curState',curState)
          // const curScreen = getCurrentRouteName(curState);
          // console.log("currentScreen", curScreen);
          console.log('prevState', prevState)
          const prevScreen = getCurrentRouteName(prevState);
          console.log("prevScreen", prevScreen);
        }} />
    </Provider>);
    return (
      <AppContainer />
    )
  }
}
