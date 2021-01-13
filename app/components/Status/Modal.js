import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TextInput,
} from 'react-native';

export default function Modals(props) {
  const {visible, text, textoboton, onPress, colorFondo, onPress2} = props;
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={[styles.centeredView]}>
          <View style={[styles.modalView, {backgroundColor: colorFondo}]}>
            <TouchableHighlight
              style={{
                justifyContent: 'center',
                backgroundColor: colorFondo,
                marginTop: 10,
                alignSelf: 'flex-end',
                borderColor: '#fff',
                borderWidth: 2,
                borderRadius: 50,
                width: 20,
                height: 20,
              }}
              onPress={onPress2}>
              <Text style={[styles.textStyle2, {color: '#fff'}]}>X</Text>
            </TouchableHighlight>
            <View style={{justifyContent:'center',marginTop:'70%'}}>
              <Text style={[styles.modalText, {color: '#fff'}]}>{text}</Text>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: '#6d1b7b',
                  marginTop: 10,
                }}
                onPress={onPress}>
                <Text style={[styles.textStyle, {color: '#fff'}]}>
                  {textoboton}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  openButton: {
    backgroundColor: '#6d1b7b',
    borderRadius: 10,
    paddingHorizontal: 50,
    elevation: 2,
    paddingVertical: 10,
  },
  closeButton: {
    borderRadius: 10,
    paddingHorizontal: 50,
    elevation: 2,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#6d1b7b',
    backgroundColor: '#fff',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle2: {
    color: '#6d1b7b',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  textInput: {
    paddingLeft: 10,
    marginVertical: 30,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    width: '100%',
    textAlign: 'center',
  },
});
