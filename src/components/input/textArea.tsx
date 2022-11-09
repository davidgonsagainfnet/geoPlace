import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const props = {
  title: String,
  placeholder: String,
  ChangeText: String,
};

export default function TextArea({title, placeholder, ChangeText}: props) {
  return (
    <View>
      <Text style={styles.titleinput}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        multiline
        numberOfLines={4}
        onChangeText={ChangeText}
      />
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
    marginBottom: 12,
    padding: 10,
  },
});
