import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default function Home() {
  const navigation = useNavigation();
  return (
    <>
      <View style={style.vtop}>
        <View style={style.vimgtopgeral}>
          <View style={style.vtopimginternoleft}>
            <Text style={style.textTop}>GEO</Text>
          </View>
          <View style={style.vtopimginternocenter}>
            <Image
              source={require('../../assets/pointTopoint.png')}
              style={style.imagetop}
            />
          </View>
          <View style={style.vtopimginternorigth}>
            <Text style={style.textTop}>PLACE</Text>
          </View>
        </View>
      </View>
      <View style={style.vbody}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={style.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
      <View style={style.vfoot}>
        <TouchableOpacity
          style={style.vbtfootleft}
          onPress={() => navigation.navigate('Registration')}>
          <Image source={require('../../assets/gmappoint.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.vbtfootrigth}
          onPress={() => navigation.navigate('MyPlace')}>
          <Image source={require('../../assets/placephoto.png')} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  vtop: {
    backgroundColor: '#4D98DE',
    flex: 0.7,
  },
  vbody: {
    flex: 6,
  },
  vfoot: {
    flex: 0.8,
    flexDirection: 'row',
  },
  imagetop: {
    width: 60,
    height: 60,
  },
  vimgtopgeral: {
    flexDirection: 'row',
    flex: 1,
  },
  vtopimginternoleft: {
    flex: 0.7,
    alignItems: 'center',
  },
  vtopimginternocenter: {
    flex: 0.3,
    alignItems: 'center',
  },
  vtopimginternorigth: {
    flex: 1,
    alignItems: 'center',
  },
  textTop: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
  },
  vbtfootleft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5CBF78',
  },
  vbtfootrigth: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4D98DE',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
