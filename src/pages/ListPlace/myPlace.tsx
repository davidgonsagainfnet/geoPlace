import React, {useEffect, useState, useContext} from 'react';
import {Text, View, StyleSheet, ScrollView, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ButtonPerson from '../../components/button/buttonPerson';
import Card from '../../components/card/card';
import {AppContext} from '../../app/AppContext';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

export default function MyPlace() {
  const {appState, setAppState} = useContext(AppContext);
  const [arrayExibir, setArrayExibir] = useState<Array<any>>([]);
  const navigation = useNavigation();

  const SpaceCard = styled.View`
    margin: 10px;
  `;

  useEffect(() => {
    setArrayExibir(appState.markers);
  }, []);

  useEffect(() => {
    setAppState({
      ...appState,
      markers: arrayExibir,
    });
  }, [arrayExibir]);

  function delet(key) {
    Alert.alert('Apagar Local', 'Deseja Apagar esse local?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'APAGAR',
        onPress: () => {
          const arrayApagar = arrayExibir.filter(p => {
            return p.key !== key;
          });
          setArrayExibir(arrayApagar);
        },
      },
    ]);
  }

  function edit(key) {
    const arrayFilter = arrayExibir.filter(p => {
      return p.key === key;
    });
    console.log(arrayFilter);
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
          <View style={{flexDirection: 'row'}}>
            <View style={styles.vBtFilter}>
              <ButtonPerson
                title={'Conhecido'}
                color={'#B1F9AF'}
                textColor={'#000'}
              />
            </View>
            <View style={styles.vBtFilter}>
              <ButtonPerson
                title={'A Conhecer'}
                color={'#F8FAA1'}
                textColor={'#000'}
              />
            </View>
            <View style={styles.vBtFilter}>
              <ButtonPerson
                title={'Evitar'}
                color={'#F8B9B9'}
                textColor={'#000'}
                style={styles.vBtFilter}
              />
            </View>
          </View>
          {arrayExibir &&
            arrayExibir.map(o => (
              <SpaceCard key={o.key}>
                <Card
                  local={o.estado}
                  cidade={o.cidade}
                  descricao={o.descricao}
                  cor={o.corMarker}
                  eventDelete={() => delet(o.key)}
                  eventEdit={() => edit(o.key)}
                />
              </SpaceCard>
            ))}
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
  vBtFilter: {
    flex: 1,
    marginEnd: 5,
  },
});
