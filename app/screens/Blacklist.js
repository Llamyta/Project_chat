import React, {useCallback, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {size} from 'lodash';
import Bloqued from '../components/Contacts/Bloqued';
//firebase
import {firebaseApp} from '../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
//store
const ref = firebase.firestore(firebaseApp);

const Blacklist = (props) => {
  const [info, setInfo] = useState({});
  const {params} = props.route;

  // console.log(params.Email);
  useFocusEffect(
    useCallback(() => {
      const resulInfo = [];
      ref
        .collection('Contactos')
        .where('UserContactEmail', '==', params.Email)
        .where('bolqued', '==', true)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const informacion = doc.data();
            informacion.id = doc.id;
            resulInfo.push(informacion);
          });
          setInfo(resulInfo);
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error);
        });
    }, []),
  );
  return (
    <View style={styles.container}>
      {size(info) > 0 ? (
        <>
          <Bloqued info={info} />
        </>
      ) : (
        <View style={styles.noData}>
          <Text style={styles.textoSinDatos}>
            you have none blocked contacts
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
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

export default Blacklist;
