import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';
//imagenes
import Img from '../../assets/bk.png';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={Img} style={styles.image}>
        <View>
          <View style={styles.card}></View>
          <Text style={styles.text}>ChatUp</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    paddingTop: '20%',
  },
  card: {
    width: '40%',
    height: 150,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});
export default SplashScreen;