import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function Card() {
  return (
    <View style={{backgroundColor: '#F1FCE4'}}>
      <Text style={style.local}>Nome do Local</Text>
      <Text style={style.cidade}>Cidade</Text>
      <Text style={style.text}>
        Lorem Ipsum is simply dum my text of the printing and typesetting
        industry. Lorem Ipsum has been the indus try's standard dummy
      </Text>
      <View style={style.vButtons}>
        <View style={{flexDirection: 'row', marginEnd: 15}}>
          <Image source={require('../../assets/edit.png')} />
          <Image source={require('../../assets/lixeira.png')} />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  local: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  cidade: {
    fontSize: 20,
    marginBottom: 9,
  },
  text: {
    fontSize: 20,
  },
  vButtons: {
    alignItems: 'flex-end',
  },
});
