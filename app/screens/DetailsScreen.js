import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {firebaseApp} from '../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);
const DetailsScreen = ({navigation}) => {
  const [info, setInfo] = useState([]);
  const usu = firebase.auth().currentUser.email;
  useEffect(() => {
    const aux = [];
    db.collection('Usuarios')
      .where('Email', '==', usu)
      .get()
      .then((res) => {
        res.forEach((element) => {
          // if(usu===element.data().email){
          setInfo(element.data());
          // }
        });
      });
  }, []);
  console.log(info.Celular);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.imageBackground}
            resizeMode="cover"
            source={{
              uri:
                'https://themindsetproject.com.au/wp-content/uploads/2017/08/avatar-icon.png',
            }}
          />
        </View>
        <View style={styles.informacion}>
          <View style={styles.bordes}>
            <Text style={styles.texto}>{info.Nombre}</Text>
          </View>
          <View style={[styles.bordes]}>
            <Text style={{textAlign: 'center', paddingVertical: '3%'}}>
              {info.Email}
            </Text>
          </View>
          <View style={[styles.bordes]}>
            <Text style={{textAlign: 'center', paddingVertical: '3%'}}>
              {info.Celular}
            </Text>
          </View>

          <View style={[styles.bordes]}></View>
        </View>
      </View>
    </ScrollView>
  );
};
const {height} = Dimensions.get('screen');
const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: height * 0.1,
  },
  informacion: {
    alignItems: 'center',
    paddingTop: height * 0.05,
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: '3%',
    textAlign: 'center',
  },
  donaciones: {
    paddingTop: height * 0.05,
  },
  imageBackground: {
    borderColor: 'white',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  bordes: {
    borderTopWidth: 0.2,
    borderTopColor: '#000',
    width: width,
  },
});
export default DetailsScreen;
