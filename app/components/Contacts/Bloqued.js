import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';
//firebase
import {firebaseApp} from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
//store
const ref = firebase.firestore(firebaseApp);

function Bloqued(props) {
  const {info} = props;
  const navigation = useNavigation();
  // console.log(info);
  return (
    <View style={styles.footer}>
      <Text style={styles.title}>My Blacklist</Text>
      <FlatList
        data={info}
        navigation={navigation}
        renderItem={(informacion) => (
          <Contact informacion={informacion} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
function Contact(props) {
  const {informacion, navigation} = props;

  const {Celular, Email, Nombre, UserContactEmail, bolqued, id} = informacion.item;
  // console.log(id);

  const UnBlockContact = async(e) => {
    ref
      .collection('Contactos').doc(id)
      .update({
        bolqued: false,
      })
      .then(() => {
        console.log('Document successfully updated');
      });
      navigation.navigate('Configuration')
  };
  return (
    <>
      <ScrollView>
        <View style={styles.item}>
          <Avatar
            size={80}
            title={'person'}
            source={{
              uri:
                'https://themindsetproject.com.au/wp-content/uploads/2017/08/avatar-icon.png',
            }}
          />
          <View style={{justifyContent: 'center', marginLeft: 10}}>
            <Text style={{color: '#dddddd'}}>{Nombre}</Text>
            <Text style={{color: '#dddddd'}}>Celular: {Celular}</Text>
          </View>
          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              zIndex: 1,
              right: 10,
            }}>
            <TouchableOpacity
              style={{borderColor: '#6d1b7b', borderWidth: 1, borderRadius: 5}}
              onPress={UnBlockContact}>
              <Text style={{margin: 5, color: '#6d1b7b'}}>UnBlock</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default Bloqued;

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
    flexDirection: 'row',
    alignSelf: 'stretch',
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.5,
  },
});
