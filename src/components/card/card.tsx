import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const props = {
  local: String,
  cidade: String,
  descricao: String,
  cor: String,
  eventDelete: String,
  eventEdit: String,
};

export default function Card({
  local,
  cidade,
  descricao,
  cor,
  eventDelete,
  eventEdit,
}: props) {
  return (
    <View style={{backgroundColor: cor}}>
      <Text style={style.local}>{local}</Text>
      <Text style={style.cidade}>{cidade}</Text>
      <Text style={style.text}>{descricao}</Text>
      <View style={style.vButtons}>
        <View style={{flexDirection: 'row', marginEnd: 15}}>
          <TouchableOpacity onPress={eventEdit}>
            <Image source={require('../../assets/edit.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={eventDelete}>
            <Image source={require('../../assets/lixeira.png')} />
          </TouchableOpacity>
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
