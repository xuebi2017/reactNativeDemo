/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component }from "react";
import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import DetailsScreen from './src/views/details/details'
import HomeScreen from './src/views/home/home'

//忽略黄色警告
console.disableYellowBox = true;

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
      },
    }
  }
);

//调试app时刷新应该停留在当前页，实际上不是的
const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;
// export const App = () => <AppNavigator persistenceKey={navigationPersistenceKey} />;

const AppContainer = createAppContainer(AppNavigator);


export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
