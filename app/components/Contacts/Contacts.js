import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';

function Contacts(props) {
  const { info } = props;
  const navigation = useNavigation();
  // console.log("info recibida",info);
  return (
    <View style={styles.footer}>
      <Text style={styles.title}>ChatUp</Text>
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
  const { informacion, navigation } = props;
 
  const { Celular, Email, Nombre, UserContactEmail, bolqued , id} = informacion.item;
  //   const {bolqued}=informacion.item.bolqued;
  const OpenChat = () => {
    navigation.navigate('Chats', {
      Celular,
      Email,
      Nombre,
      UserContactEmail,
      bolqued,
      id
    });
  };
  //   console.log("esa es la info",informacion.item.bolqued);
  return (
    <>
      <ScrollView>
        <TouchableOpacity onPress={OpenChat} style={styles.item}>
          <Avatar
            size={80}
            title={'person'}
            source={{
              uri:
                'https://themindsetproject.com.au/wp-content/uploads/2017/08/avatar-icon.png',
            }}
          />
          <View style={{ justifyContent: 'center', marginLeft: 10 }}>
            <Text style={{ color: '#262626' }}>{Nombre}</Text>
            <Text style={{ color: '#262626' }}>Celular: {Celular}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

export default Contacts;

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
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    borderBottomColor: '#262626',
    borderBottomWidth: 0.5,
  },
});
