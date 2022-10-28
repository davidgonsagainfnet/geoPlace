import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

export default function InputText(props) {
  return (
    <View>
      <Text style={styles.titleinput}>{props.title}</Text>
      <TextInput style={styles.input} placeholder={props.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleinput: {
    fontSize: 20,
    marginTop: 15,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
  },
});
