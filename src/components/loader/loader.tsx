import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Loader() {
  return (
    <View style={style.container}>
      <Animatable.Image
        animation="flipInY"
        source={require('../../assets/logo.png')}
        style={{width: '60%'}}
        resizeMode="contain"
      />
      <ActivityIndicator size={64} color={'#fff'} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4D98DE',
    flex: 1,
  },
});
