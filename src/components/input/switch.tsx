import React from 'react';
import {Switch, Text, View, StyleSheet} from 'react-native';

const props = {
  title: String,
};

export default function SwitchCuston({title}: props) {
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={true ? '#DCDCDC' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 7,
  },
  text: {
    fontSize: 20,
  },
});
