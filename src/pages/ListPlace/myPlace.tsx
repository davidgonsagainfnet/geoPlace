import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ButtonPerson from '../../components/button/buttonPerson';
import Card from '../../components/card/card';

export default function MyPlace() {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require('../../assets/logo.png')}
          style={{width: '40%'}}
          resizeMode="contain"
        />
      </View>

      <Animatable.View
        delay={600}
        animation="fadeInUp"
        style={styles.containerForm}>
        <Text style={styles.title}>Meus Locais</Text>
        <ScrollView>
          <View style={{flexDirection: 'row', with: '100%'}}>
            <ButtonPerson
              title={'Conhecido'}
              color={'#B1F9AF'}
              textColor={'#000'}
            />
            <ButtonPerson
              title={'A Conhecer'}
              color={'#F8FAA1'}
              textColor={'#000'}
            />
            <ButtonPerson
              title={'Evitar'}
              color={'#F8B9B9'}
              textColor={'#000'}
            />
          </View>
          <Card />
        </ScrollView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D98DE',
  },
  containerLogo: {
    flex: 1,
    backgroundColor: '#4D98DE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    flex: 3,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 18,
    alignSelf: 'center',
  },
  vSwitdual: {
    flexDirection: 'row',
    marginTop: 15,
  },
  vSwitOne: {
    marginBottom: 15,
  },
  vButtons: {
    marginBottom: 30,
    marginTop: 15,
  },
});
