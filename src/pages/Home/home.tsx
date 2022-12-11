import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, PermissionsAndroid} from 'react-native';
import {Image, Text, Box, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {AppContext} from '../../app/AppContext';
import Geolocation from 'react-native-geolocation-service';
import mapStyleLigth from '../../mapStyleLight.json';
import mapStyleDark from '../../mapStyleDark.json';
import {appActions, useAppDispatch, useAppSelector} from '../../app/appStore';

export default function Home() {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);
  const {appState, setAppState} = useContext(AppContext);
  const [region, setRegion] = useState(undefined);
  const [focusLatitude, setFocusLatitude] = useState(0);
  const navigation = useNavigation();
  const [makersTela, setMakersTela] = useState([]);
  const [mapStyleTime, setMapStyleTime] = useState();

  useEffect(() => {
    init();
    setMapStyleTime(isDarkTheme === true ? mapStyleDark : mapStyleLigth);
    console.log(isDarkTheme);
  }, []);

  useEffect(() => {
    init();
  }, [focusLatitude]);

  useEffect(() => {
    setMakersTela([...appState.markers]);
  }, [appState.markers]);

  useEffect(() => {
    positionDevice();
  }, [makersTela]);

  function init() {
    if (appState.coordsFocus.latitude === 0) {
      positionDevice();
    } else {
      setRegion({
        latitude: appState.coordsFocus.latitude,
        longitude: appState.coordsFocus.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
    setMakersTela([...appState.markers]);
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
    setAppState({
      ...appState,
      coordsFocus: p.nativeEvent.coordinate,
    });
    let place = {
      latitude: p.nativeEvent.coordinate.latitude,
      longitude: p.nativeEvent.coordinate.longitude,
      edit: false,
    };
    navigation.navigate('Registration', place);
  }

  function edit(key) {
    const arrayFilter = makersTela.filter(p => {
      return p.key === key;
    });
    let place = {
      latitude: parseFloat(arrayFilter[0].latitude),
      longitude: parseFloat(arrayFilter[0].longtitude),
      edit: true,
      rua: arrayFilter[0].rua,
      estado: arrayFilter[0].estado,
      cidade: arrayFilter[0].cidade,
      corMarker: arrayFilter[0].corMarker,
      descricao: arrayFilter[0].descricao,
      key: key,
    };
    navigation.navigate('Registration', place);
  }

  function trocarThema() {
    // setAppState({
    //   ...appState,
    //   isDarkTheme: !appState.isDarkTheme,
    // });
    dispatch(
      appActions.setDarkTheme({
        isDarkTheme: !isDarkTheme,
      }),
    );
    setMapStyleTime(isDarkTheme !== true ? mapStyleDark : mapStyleLigth);
  }

  return (
    <>
      <Box style={style.vtop}>
        <Box style={style.vimgtopgeral}>
          <Box style={style.vtopimginternoleft}>
            <Text fontSize="50" bold color={'#fff'}>
              GEO
            </Text>
          </Box>
          <Box style={style.vtopimginternocenter}>
            <Image
              source={require('../../assets/pointTopoint.png')}
              style={style.imagetop}
              alt=""
            />
          </Box>
          <Box style={style.vtopimginternorigth}>
            <Text fontSize="50" bold color={'#fff'}>
              PLACE
            </Text>
          </Box>
        </Box>
      </Box>
      <Box style={style.vbody}>
        <MapView
          onMapReady={() => {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then(() => {});
          }}
          provider={PROVIDER_GOOGLE}
          style={style.map}
          region={region}
          showsUserLocation={true}
          customMapStyle={mapStyleTime}
          loadingEnabled={true}
          onPress={e => locationEvent(e)}>
          {makersTela.map(p => {
            let point = {
              latitude: Number(p.latitude),
              longitude: Number(p.longtitude),
            };
            return (
              <Marker
                coordinate={point}
                key={p.key}
                pinColor={p.corMarker}
                description={p.descricao}
                onPress={e => {
                  edit(p.key);
                }}
              />
            );
          })}
        </MapView>
      </Box>
      <Box style={style.vfoot}>
        <Pressable
          style={style.vbtfootleft}
          onPress={() => navigation.navigate('Registration', {})}>
          <Image source={require('../../assets/gmappoint.png')} alt="" />
        </Pressable>
        <Pressable
          style={style.vbtfootcenter}
          onPress={() => navigation.navigate('MyPlace')}>
          <Image source={require('../../assets/placephoto.png')} alt="" />
        </Pressable>
        <Pressable
          style={style.vbtfootcenterleft}
          onPress={() => navigation.navigate('Feeds')}>
          <Image source={require('../../assets/mundo.png')} alt="" />
        </Pressable>
        <Pressable style={style.vbtfootrigth} onPress={() => trocarThema()}>
          <Image source={require('../../assets/themes.png')} alt="" />
        </Pressable>
      </Box>
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
    backgroundColor: '#FFD700',
  },
  vbtfootcenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4D98DE',
  },
  vbtfootcenterleft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#66CDAA',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
