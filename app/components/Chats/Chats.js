import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ScrollView } from 'react-native-gesture-handler';
//components
import Modal from './Modal'
//firebase
import { firebaseApp } from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');

const db = firebase.firestore(firebaseApp);
export default function Chats(props) {
  const { route } = props;
  const navigation = useNavigation();
  //modal
  const [modalState, setModalState] = useState(false);
  //input
  const [formValue, setFormValue] = useState('');
  const con = route.params.Email;
  const de = route.params.UserContactEmail;
  // console.log('info en el chat',route.params.Email);
  //orderchats
  const messagesRef = db.collection('Chat');
  const query = messagesRef.orderBy('date').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  //para envar mensaje
  const SendMessage = async (e) => {
    e.preventDefault();
    if (formValue !== '') {
      db.collection('Chat')
        .doc()
        .set({
          date: firebase.firestore.FieldValue.serverTimestamp(),
          message: formValue,
          sendFrom: route.params.UserContactEmail,
          sendTo: route.params.Email,
        })
        .then(function () {
          console.log('info guardada');
        })
        .catch(function (error) {
          console.log('Error al crear', error);
        });
      setFormValue('');
    }
  };
  //para bloquear al usuario
  const BlockUser = async (e) => {
    db
      .collection('Contactos').doc(route.params.id)
      .update({
        bolqued: true,
      })
      .then(() => {
        console.log('Document successfully updated');
        navigation.navigate('Home')
      });
  }
  //para menu dots
  const OpenModal = () => {
    setModalState(!modalState);
  }
  return (
    <View style={styles.container}>
      
      <View
        style={{
          flex: 1,
          height: height * 0.9,
          backgroundColor: '#fff',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: height * 0.08,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#dddddd'
          }}>
          
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#262626' }}>
            {con}
          </Text>
          <TouchableOpacity style={{ position: 'absolute', right: 15, top:20 }} onPress={OpenModal}>
            <Icon name="dots-vertical" color="#262626" size={20} />
            <Modal
            visible={modalState}
            text="Hey! do you want to block this contact?"
            textoboton=" Block "
            onPress={BlockUser}
            textoboton2="Cancel"
            onPress2={() => setModalState(!modalState)}
          />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View>
            {messages &&
              messages.map((msg) => (
                <ChatMessage key={msg.id} msg={msg} con={con} de={de} />
              ))}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: height * 0.1,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignSelf: 'stretch',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          value={formValue}
          placeholder="Write message..."
          onChange={(e) => setFormValue(e.nativeEvent.text)}
          style={{
            backgroundColor: '#fff',
            marginHorizontal: width * 0.05,
            borderRadius: 20,
            width: width * 0.9,
            height: 50,
          }}
        />
        <TouchableOpacity
          onPress={SendMessage}
          style={{ zIndex: 1, position: 'absolute', right: 40 }}>
          <Feather name="send" size={20} color={'#6d1b7b'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
function ChatMessage(props) {
  const text = props.msg;
  if (
    (props.de === text.sendFrom && props.con === text.sendTo) ||
    (props.con === text.sendFrom && props.de === text.sendTo)
  ) {
    return (
      <View
        style={
          text.sendFrom === firebase.auth().currentUser.email
            ? [styles.message, styles.send]
            : [styles.message, styles.recived]
        }>
        <Text style={{ backgroundColor: 'transparent', color: '#000' }}>
          {text.message}
        </Text>
      </View>
    );
  } else {
    return <View></View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#6d1b7b',
  },
  message: {
    height: height * 0.05,
    marginVertical: 5,
    marginHorizontal: 5,
    paddingHorizontal: width * 0.05,
    borderRadius: 10,
    justifyContent: 'center',
  },
  send: {
    color: '#fff',
    backgroundColor: '#af52bf',
    alignSelf: 'flex-end',
  },
  recived: {
    backgroundColor: '#e5e5ea',
    color: '#000',
    alignSelf: 'flex-start',
  },
});
