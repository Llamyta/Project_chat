import 'react-native-gesture-handler';
import { StatusBar, LogBox } from 'react-native'

import { decode, encode } from 'base-64';
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

import React from 'react';
import MainNavigator from './app/navigations/Navigation';
// import MainNavigator from './src/Navigator/MainNavigator';
// YellowBox.ignoreWarnings(["Setting a timer", "FlatList", "react-native"]);
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
const App = () => {
  return (
    <>
      <StatusBar backgroundColor='#6d1b7b' barStyle="light-content" />
      <MainNavigator />
    </>
  );
};

export default App;
