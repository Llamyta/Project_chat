import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import Home from '../screens/HomeScreen';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props) {
  const {userInfo} = props;
  const {navigation} = props;

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={[styles.drawerContent]}>
          <View>
            <View style={styles.avatar}>
              <Avatar.Image
                source={{
                  uri:
                    'https://themindsetproject.com.au/wp-content/uploads/2017/08/avatar-icon.png',
                }}
                size={120}
                style={{backgroundColor:'#fff'}}
              />
              <View style={{flexDirection: 'column'}}>
                <Title style={[styles.title, {textAlign: 'center'}]}>Hi!</Title>
                <Caption style={styles.caption}>
                  {userInfo.Email ? userInfo.Email : 'user@gmail.com'}
                </Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({size}) => <Icon name="mail" color="#000" size={size} />}
              label="Chats"
              onPress={() => {
                navigation.navigate('Home');
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Icon name="favorite" color="#000" size={size} />
              )}
              label="Status"
              onPress={() => {
                navigation.navigate('Status');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="settings" color="#000" size={size} />
              )}
              label="Configuration"
              onPress={() => {
                navigation.navigate('Configuration');
              }}
            />
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              icon={({color, size}) => (
                <Icons name="account-outline" color="#000" size={size} />
              )}
              label="Profile"
              onPress={() => {
                navigation.navigate('Perfil');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {/**Cerrar sesion */}
      <Drawer.Section style={[styles.bottomDrawerSection]}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color="#000" size={size} />
          )}
          label="Log Out"
          onPress={() => firebase.auth().signOut()}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#6d1b7b',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    flexDirection: 'column',
    marginTop: 30,
    alignItems: 'center',
    backgroundColor:'#fff'
  },
});
