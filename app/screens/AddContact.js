import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import { Avatar } from 'react-native-elements'
import { firebaseApp } from '../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
//clases
import { validateEmail } from '../utils/utils';
import Loading from '../components/Loading';

const db = firebase.firestore(firebaseApp);
const AddContact = ({ navigation }) => {
  //Loading
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  //Inputs
  const [email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const usu = firebase.auth().currentUser.email;

  const register = async () => {
    if (!email || !Name || !phoneNumber) {
      Alert.alert('Error', 'All fields are required', [{ text: 'OK' }], {
        cancelable: false,
      });
    } else {
      if (!validateEmail(email)) {
        Alert.alert(
          'Email Error',
          'You must provide a valid email address',
          [{ text: 'OK' }],
          { cancelable: false },
        );
      } else {
        if (isNaN(phoneNumber)) {
          Alert.alert(
            'Phone Number Error',
            'The phone number you provided is not valid',
            [{ text: 'OK' }],
            { cancelable: false },
          );
        } else {
          try {
            AddNewContactToFirebase();
          } catch (e) {
            setIsVisibleLoading(false);
            console.log(e);
            Alert.alert(
              'Error',
              'Failed to create contact, try again later',
              [{ text: 'OK' }],
              { cancelable: false },
            );
          }
        }
      }
    }
  };
  const AddNewContactToFirebase = () => {
    setIsVisibleLoading(true);
    db.collection('Contactos')
      .doc()
      .set({
        Celular: phoneNumber,
        Nombre: Name,
        Email: email,
        UserContactEmail: usu,
        bolqued: false,
      })
      .then(function () {
        console.log('info guardada');
        setIsVisibleLoading(false);
        navigation.navigate('HomeDrawer');
      })
      .catch(function (error) {
        console.log('Error al crear', error);
      });
  };

  return (
    <ImageBackground
      // source={Fondo}
      style={styles.imageF}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text> </Text>
        </View>
        <View style={{ zIndex: 1, alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: 150,
              height: 150,
              borderRadius: 100,
              position: 'absolute',
              borderRadius: 100,
              bottom: -100,
            }}>
            <Avatar
              size={150}
              title={'person'}
              source={{
                uri:
                  'https://themindsetproject.com.au/wp-content/uploads/2017/08/avatar-icon.png',
              }}
            />
          </View>
          {/* <Text tyle={styles.text_header}>New contact</Text> */}
        </View>
        <View animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <TextInput
              onChange={(e) => setEmail(e.nativeEvent.text)}
              placeholder="Email"
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 20,
              },
            ]}>
            Name
          </Text>
          <View style={styles.action}>
            <TextInput
              onChange={(e) => setName(e.nativeEvent.text)}
              placeholder="Full Name"
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 20,
              },
            ]}>
            Phone Number
          </Text>
          <View style={styles.action}>
            <TextInput
              onChange={(e) => setPhoneNumber(e.nativeEvent.text)}
              placeholder="Phone Number"
              style={styles.textInput}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={register}
              style={[
                styles.signIn,
                {
                  borderColor: '#6d1b7b',
                  backgroundColor: '#6d1b7b',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Save Contact
              </Text>
            </TouchableOpacity>
            <Loading isVisible={isVisibleLoading} text="Creando Contacto" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageF: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'stretch',
    backgroundColor: '#6d1b7b',
  },
  image: {
    //ajustar el contenido de la imagen
    resizeMode: 'contain',
  },
  footer: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 150,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: 'black',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: 'black',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
