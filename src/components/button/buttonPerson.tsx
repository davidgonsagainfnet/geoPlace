import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const props = {
  title: String,
  color: String,
};

export default function ButtonPerson({title, color}: props) {
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 3,
          borderRadius: 8,
          marginBottom: 5,
        }}>
        <Text style={style.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
