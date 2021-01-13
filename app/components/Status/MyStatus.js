import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FriendsStatus from './FriendsStatus';
import Modal from './Modal'
//firebase
import {firebaseApp} from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
//store
const ref = firebase.firestore(firebaseApp);


//Dimensions
const { height } = Dimensions.get('screen');
function MyStatus(props) {

  const { info } = props;
  return (
    <View style={styles.footer}>
      <View>
        <Text style={[styles.title]}>My Status</Text>
        <FlatList
          data={info}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(informacion) => <Status informacion={informacion} />}
        />
      </View>
      {/* <View>
        <Text style={styles.title}>My Friends</Text>
        <FlatList
          data={info}
          showsHorizontalScrollIndicator={false}
          renderItem={(informacion) => <Status informacion={informacion} />}
        />
      </View> */}
    </View>
  );
}
function Status(props) {
  const { informacion } = props;
  const { color, date, email, status, id } = informacion.item;
  //modal
  const [modalState, setModalState] = useState(false);
  const DeleteStatus = async () => {
    ref.collection("Estados").doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
      setModalState(!modalState)
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });

  };

  return (
    <>
      <View style={styles.item}>
        <TouchableOpacity onPress={() => setModalState(!modalState)} style={styles.item}>
          <View
            style={{
              backgroundColor:color,
              width: 75,
              height: 75,
              borderRadius: 50,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderColor:'#dddddd',
              borderWidth:1
            }}>
            <Text
              style={{
                color: '#fff',
                justifyContent: 'center',
                textAlign: 'center',
                fontWeight:'bold'
              }}>
              {status}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalState}
        text={status}
        textoboton=" Delete "
        onPress={DeleteStatus}
        colorFondo={color}
        // textoboton2="Cancel"
        onPress2={() => setModalState(!modalState)}
      />
    </>
  );
}

export default MyStatus;

const styles = StyleSheet.create({
  footer: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: '3%',
  },
  item: {
    marginRight: 5,
  },
});
