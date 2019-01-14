/** @format */

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './src/app.json';

//注册app
AppRegistry.registerComponent(appName, () => App);
