import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import Share from 'react-native-share';
//firebase
import {firebaseApp} from '../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
//store
const ref = firebase.firestore(firebaseApp);

const Configuraciones = ({navigation}) => {
  const [info, setInfo] = useState({});
  const usu = firebase.auth().currentUser.email;
  useEffect(() => {
    ref
      .collection('Usuarios')
      .where('Email', '==', firebase.auth().currentUser.email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const informacion = doc.data();
          setInfo(informacion);
        });
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }, []);
  const myCustomShare = async () => {
    const shareOptions = {
      message: 'Chat with friends all over the world with ChatUp ',
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };
  //Clases Botones
  const OpenBlackList = () => {
    navigation.navigate('Blacklist', info);
  };
  const OpenUpdateProfile = () => {
    navigation.navigate('Perfil', info);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar
            source={{
              uri:
                'https://themindsetproject.com.au/wp-content/uploads/2017/08/avatar-icon.png',
            }}
            size={150}
          />
          <View style={{justifyContent: 'center'}}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              {info.Nombre}
            </Title>
            <Caption style={styles.caption}>{info.Email}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="user" color="#777777" size={20} />
          <Text style={{color: '#777777', marginLeft: 20}}>{info.Nombre}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{color: '#777777', marginLeft: 20}}>
            +591 {info.Celular}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="mail" color="#777777" size={20} />
          <Text style={{color: '#777777', marginLeft: 20}}>{info.Email}</Text>
        </View>
      </View>

      <View
        style={[
          styles.menuWrapper,
          {borderTopColor: '#dddddd', borderTopWidth: 1},
        ]}>
        <TouchableOpacity onPress={OpenBlackList} style={styles.botones}>
          <View style={styles.menuItem}>
            <Icon name="user-x" color="#6d1b7b" size={20} />
            <Text style={styles.menuItemText}>Black list</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={OpenUpdateProfile} style={styles.botones}>
          <View style={styles.menuItem}>
            <Icon name="user-check" color="#6d1b7b" size={20} />
            <Text style={styles.menuItemText}>Update your profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={myCustomShare} style={styles.botones}>
          <View style={styles.menuItem}>
            <Icon name="share-2" color="#6d1b7b" size={20} />
            <Text style={styles.menuItemText}>Tell your friends</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {firebase.auth().signOut()}} style={styles.botones}>
          <View style={styles.menuItem}>
            <Icon name="log-out" color="#6d1b7b" size={20} />
            <Text style={styles.menuItemText}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Configuraciones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  botones: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
});
