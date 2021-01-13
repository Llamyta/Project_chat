import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {size} from 'lodash';
//comp
import ButtonMenuRound from '../components/MenuButon/MenuButon';
import Contacts from '../components/Contacts/Contacts';
import {useFocusEffect} from '@react-navigation/native';
//firebase
import {firebaseApp} from '../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
//store
const ref = firebase.firestore(firebaseApp);

export default function HomeScreen({navigation}) {
  const [info, setInfo] = useState({});
  const [addButton, setAddButton] = useState(false);
  const [openContacts, setOpenContacts] = useState(false);
  const usu = firebase.auth().currentUser.email;
  const contacts = () => {
    setAddButton(!addButton);
    navigation.navigate('AddContact');
  };

  useFocusEffect(
    useCallback(() => {
      const resulInfo = [];
      ref
        .collection('Contactos')
        .where('bolqued', '==', false)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            if (usu === doc.data().UserContactEmail) {
              const informacion = doc.data();
              informacion.id = doc.id;
              resulInfo.push(informacion);
              // console.log(informacion);
            }
          });
          setInfo(resulInfo);
        });

    }, []),
  );
  // console.log("informacion completa",info);

  return (
    <View style={styles.container}>
      {size(info) > 0 ? (
        <Contacts info={info} />
      ) : (
        <View style={styles.noData}>
          <Text style={styles.textoSinDatos}>
            Wow! It seems you don't have chats
          </Text>
        </View>
      )}
      <ButtonMenuRound
        styleT={[styles.iconoSubirTexto]}
        // onPressT={UploadText}
        nameT={'forum'}
        styleF={[styles.iconoSubirFoto]}
        onPressF={contacts}
        nameF={'account-plus'}
        style={[styles.icono]}
        onPress={() => {
          setAddButton(!addButton);
        }}
        name={addButton ? 'close' : 'plus'}
        size={23}
        addButton={addButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  icono: {
    backgroundColor: '#6d1b7b',
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 25,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    borderRadius: 100,
    color: '#fff',
  },
  iconoSubirFoto: {
    backgroundColor: '#9c27b0',
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30 * 3.8,
    right: 30,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    borderRadius: 100,
  },
  iconoSubirTexto: {
    backgroundColor: '#af52bf',
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30 * 6,
    right: 30,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    borderRadius: 100,
  },
  noData: {
    paddingVertical: '60%',
    paddingHorizontal: '10%',
  },
  textoSinDatos: {
    textAlign: 'center',
    fontSize: 30,
    color: '#d8d8d8',
  },
});
