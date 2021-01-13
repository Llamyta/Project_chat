import * as React from 'react';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';
import {Alert} from 'react-native';
//vistas
import MainTabScreen from './MainTabScreen';
import Perfil from '../screens/DetailsScreen';
import AddContact from '../screens/AddContact';
import Chats from '../components/Chats/Chats';
import Blacklist from '../screens/Blacklist';
//firebase
import {firebaseApp} from '../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
//Modal
import Modals from '../components/Modals';

const db = firebase.firestore(firebaseApp);

const Drawer = createDrawerNavigator();
function App({navigation}) {
  const [userInfo, setUserInfo] = useState({});
  //modal
  const [modalState, setModalState] = useState(true);
  
  const usu = firebase.auth().currentUser.email;
  useEffect(() => {
    db.collection('Usuarios')
      .where('Email', '==', firebase.auth().currentUser.email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const informacion = doc.data();
          setUserInfo(informacion);
        });
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }, []);
  // const mensajeCambio = () => {
  //      firebase
  //         .auth()
  //         .currentUser
  //         .sendEmailVerification()
  //         .then(() => {
  //             Alert.alert(
  //                 "Message send",
  //                 "The verification message has been sent to: "+usu,
  //                 [
  //                     { text: "Ok", onPress: () => navigation.navigate('SignInScreen') }

  //                 ],
  //                 { cancelable: false }
  //             )

  //         })
  //         .catch(() => {
  //             Alert.alert(
  //                 "Error",
  //                 "Something went wrong",
  //                 [
  //                     { text: "Try again", style: 'Cancel' }

  //                 ],
  //                 { cancelable: false }
  //             )
  //         })

  // }
  // const volver =()=>{
  //     setModalState(!modalState)
  // }

  // if (verified === true) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerContent {...props} userInfo={userInfo} />
        )}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="Perfil" component={Perfil} />
        <Drawer.Screen name="AddContact" component={AddContact} />
        <Drawer.Screen name="Chats" component={Chats} />
        <Drawer.Screen name="Blacklist" component={Blacklist} />
        {/* <Drawer.Screen name="Chats" component={Chats} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
  // }
  // return (
  //     <Modals
  //         visible={modalState}
  //         text="Verify your Email address"
  //         textoboton="Send"
  //         onPress={mensajeCambio}
  //         textoboton2="Back"
  //         onPress2={volver}
  //     />
  // );
}

export default App;
