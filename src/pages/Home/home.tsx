import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {AppContext} from '../../app/AppContext';

export default function Home() {
  const [region, setRegion] = useState(null);
  const [focusLatitude, setFocusLatitude] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [focusLatitude]);

  function init() {
    if (AppContext._currentValue.appState.coordsFocus.latitude === 0) {
      positionDevice();
    } else {
      setRegion({
        latitude: AppContext._currentValue.appState.coordsFocus.latitude,
        longitude: AppContext._currentValue.appState.coordsFocus.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }

  function positionDevice() {
    Geolocation.getCurrentPosition(info => {
      setRegion({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    });
  }

  function locationEvent(p) {
    setFocusLatitude(p.nativeEvent.coordinate.latitude);
    AppContext._currentValue.appState.coordsFocus.latitude =
      p.nativeEvent.coordinate.latitude;
    AppContext._currentValue.appState.coordsFocus.longitude =
      p.nativeEvent.coordinate.longitude;
    let place = {
      latitude: p.nativeEvent.coordinate.latitude,
      longitude: p.nativeEvent.coordinate.longitude,
      edit: false,
    };
    navigation.navigate('Registration', place);
  }

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
          onMapReady={() => {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then(() => {
              console.log('USUARIO ACESSOU');
            });
          }}
          provider={PROVIDER_GOOGLE}
          style={style.map}
          region={region}
          showsUserLocation={true}
          loadingEnabled={true}
          onPress={e => locationEvent(e)}
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
