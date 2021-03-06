import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
//librerias
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
//imagenes
import Img from '../../assets/imageSplash.png';
import Img2 from '../../assets/imageSplash(2).png';
import Fondo from '../../assets/bk2.png';

const {height} = Dimensions.get('screen');
const {width} = Dimensions.get('screen');
const Splash2 = ({navigation}) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={1}>
      <View style={[styles.container, {paddingHorizontal: 30}]}>
        <View style={styles.header}>
          <Animatable.Image
            source={Img2}
            style={styles.image}
            animation="bounceIn"
          />
        </View>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <Text style={[styles.title, {textAlign: 'center'}]}>Register!</Text>
          <Text
            style={[
              styles.title,
              {textAlign: 'center', color: '#6d1b7b', fontSize: 17},
            ]}>
            Contact with friends
          </Text>
        </Animatable.View>
      </View>

      <View style={[styles.container, {width: width}]}>
        <ImageBackground source={Fondo} style={styles.imageF}>
          <View style={styles.header}>
            <Animatable.Image
              source={Img}
              style={[styles.image, {height: 200, width: 230}]}
              animation="bounceIn"
            />
          </View>

          <Animatable.View style={[styles.footer]} animation="fadeInUpBig">
            <View style={[styles.efecto]}>
              <View style={[styles.icono, {backgroundColor: '#fff'}]}>
                <MaterialIcons
                  name="chevron-left"
                  color={'#6d1b7b'}
                  size={30}
                />
              </View>
              <View style={[styles.txt, {paddingRight: '8%'}]}>
                <Text style={styles.title}>ChatUp</Text>
                <Text style={styles.text}>
                  Chat with friends arround the world
                </Text>
                <View style={styles.button}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignInScreen')}>
                    <LinearGradient
                      colors={['#6d1b7b', '#6d1b7b']}
                      style={styles.signIn}>
                      <Text style={styles.textSign}>Lets begin</Text>
                      <MaterialIcons
                        name="navigate-next"
                        color={'#ffffff'}
                        size={20}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animatable.View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const height_logo = height * 0.28;
const widthC = width * 0.98;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: widthC,
  },
  efecto: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  icono: {
    flex: 1,
    marginLeft: -30,
    backgroundColor: '#6d1b7b',
    height: '30%',
    justifyContent: 'center',
    paddingLeft: '3%',
    borderRadius: 20,
  },
  txt: {
    flex: 4,
  },
  imageF: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'stretch',
    paddingTop: '20%',
  },
  header: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1000,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    paddingVertical: 50,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  image: {
    flex: 0,
    width: 300,
    height: 190,
    //ajustar el contenido de la imagen
    resizeMode: 'stretch',
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 50,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default Splash2;
