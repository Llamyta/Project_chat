import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {size} from 'lodash';
import {useFocusEffect} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
//componentes
import ButtonMenuRound from '../components/MenuButon/MenuButon';
import MyStatus from '../components/Status/MyStatus';
import Modals from '../components/Modals';
import Loading from '../components/Loading';
//firebase
import {firebaseApp} from '../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
//storage
const db = firebase.storage(firebaseApp);
//store
const ref = firebase.firestore(firebaseApp);

export default function Estados({navigation}) {
  const [info, setInfo] = useState([]);
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');
  const [addButton, setAddButton] = useState(false);
  //modal
  const [modalState, setModalState] = useState(false);
  //Loading
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [color, setColor] = useState('');
  const usu = firebase.auth().currentUser.email;
  useFocusEffect(
    useCallback(() => {
      const resulInfo = [];
      ref
        .collection('Estados')
        .get()
        .then((res) => {
          res.forEach((doc) => {
            if (usu === doc.data().email) {
              const informacion = doc.data();
              informacion.id = doc.id;
              resulInfo.push(informacion);
              console.log(informacion);
            }
          });
          setInfo(resulInfo);
        });
    }, []),
  );
  //Estados
  const OpenModal = () => {
    setAddButton(!addButton);
    setModalState(true);
    generarNuevoColor();
  };
  const UploadImage = () => {
    PickImage();
  };
  const UploadText = () => {
    AddNewStatusToFirebase();
  };

  const PickImage = () => {
    setAddButton(!addButton);
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
    // SubmitPost();
    console.log(image);
  };
  // Error al subir
  // const SubmitPost = async () => {
  //     const uploadUri = image;
  //     let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  //     const blob = await response.blob();
  //     // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  //     try {
  //         // firebase.storage().ref(filename).put(uploadUri)
  //         // db.ref(filename)
  //         // .child(uploadUri)
  //         const aux = firebase.storage().ref(filename).put(uploadUri)
  //         await aux.put(blob).then((result) => {
  //             console.log('subido');
  //         })
  //     } catch (e) {
  //         console.log("Error aja", e);
  //     }
  // }

  //Subir mis estados
  const AddNewStatusToFirebase = () => {
    setIsVisibleLoading(true);
    const info = ref.collection('Estados').doc();

    info
      .set({
        email: usu,
        status: status,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        color: color,
      })
      .then(function () {
        setIsVisibleLoading(false);
        setModalState(!modalState);
      })
      .catch(function (error) {
        setIsVisibleLoading(false);
        setModalState(!modalState);
      });
  };
  const generarNuevoColor = () => {
    var simbolos, color;
    simbolos = '0123456789ABCDEF';
    color = '#';

    for (var i = 0; i < 6; i++) {
      color = color + simbolos[Math.floor(Math.random() * 16)];
    }

    setColor(color);
  };

  return (
    <View style={styles.container}>
      {size(info) > 0 ? (
        <>
          <MyStatus info={info} />
        </>
      ) : (
        // <Text>hay algo</Text>
        <View style={styles.noData}>
          <Text style={styles.textoSinDatos}>Nothing to see :(</Text>
        </View>
      )}
      <Loading isVisible={isVisibleLoading} text="Updating Status" />
      <Modals
        visible={modalState}
        text="Status"
        textoboton="Update"
        onPress={UploadText}
        textoboton2="Cancel"
        onPress2={() => setModalState(!modalState)}
        placeholder={'Update your status'}
        onChange={(e) => setStatus(e.nativeEvent.text)}
      />
      <ButtonMenuRound
        styleT={[styles.iconoSubirTexto]}
        onPressT={OpenModal}
        nameT={'message-text'}
        styleF={[styles.iconoSubirFoto]}
        onPressF={UploadImage}
        nameF={'image'}
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
    backgroundColor: '#fff',
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
