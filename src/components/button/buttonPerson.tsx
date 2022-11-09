import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const props = {
  title: String,
  color: String,
  textColor: String,
  press: String,
};

export default function ButtonPerson({title, color, textColor, press}: props) {
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
          borderRadius: 8,
          marginBottom: 5,
        }}
        onPress={press}>
        <Text style={{color: textColor, fontSize: 20, fontWeight: 'bold'}}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
