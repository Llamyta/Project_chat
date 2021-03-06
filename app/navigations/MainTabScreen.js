import * as React from 'react';
import {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
//vistas
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/Estados';
import Configuraciones from '../screens/Configuraciones';
//firebase
import {firebaseApp} from '../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

//stack
const HomeStack = createStackNavigator();
const StatusStack = createStackNavigator();
const ConfigurationStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#6d1b7b"
      inactiveColor="#bdb2d6"
      barStyle={{backgroundColor: '#fff'}}>
      <Tab.Screen
        name="Status"
        component={StatusStackScreen}
        options={{
          tabBarLabel: 'Estados',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="favorite" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Chats',
          tabBarColor: '#009387',
          borderTop: 0.2,
          tabBarIcon: ({color}) => (
            <MaterialIcons name="mail" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Configuration"
        component={Configuraciones}
        options={{
          tabBarLabel: 'Configuracion',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6d1b7b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 18,
        },
      }}>
      <HomeStack.Screen
        name=" "
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <FeatherIcon.Button
              name="menu"
              size={25}
              backgroundColor="#6d1b7b"
              color="#fff"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          // headerRight: () => (
          //   <FeatherIcon.Button
          //     name="send"
          //     size={25}
          //     backgroundColor="#6d1b7b"
          //     color="#fff"
          //     onPress={() => {
          //       navigation.openDrawer();
          //     }}
          //   />
          // ),
        }}
      />
    </HomeStack.Navigator>
  );
};

const StatusStackScreen = ({navigation}) => {
  return (
    <StatusStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6d1b7b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 18,
        },
      }}>
      <StatusStack.Screen
        name=" "
        component={DetailsScreen}
        options={{
          headerLeft: () => (
            <FeatherIcon.Button
              name="menu"
              size={25}
              backgroundColor="#6d1b7b"
              color="#fff"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </StatusStack.Navigator>
  );
};

export default MainTabScreen;
