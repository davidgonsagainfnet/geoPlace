import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {Box, Text, ScrollView, useContrastText} from 'native-base';
import * as Animatable from 'react-native-animatable';
import ButtonPerson from '../../components/button/buttonPerson';
import Card from '../../components/card/card';
import {AppContext} from '../../app/AppContext';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../app/appStore';

export default function MyPlace() {
  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);
  const {appState, setAppState} = useContext(AppContext);
  const [arrayExibir, setArrayExibir] = useState<Array<any>>([]);
  const [colorThemeCard, setColorThemeCard] = useState<String>('');
  const navigation = useNavigation();

  const SpaceCard = styled.View`
    margin: 10px;
  `;
  const colorTheme = isDarkTheme === true ? '#000' : '#fff';

  const contrastTheme = useContrastText(colorTheme);

  useEffect(() => {
    setArrayExibir(appState.markers);
    setColorThemeCard(colorTheme);
  }, []);

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
          setAppState({
            ...appState,
            markers: arrayApagar,
          });
        },
      },
    ]);
  }

  function edit(key) {
    const arrayFilter = arrayExibir.filter(p => {
      return p.key === key;
    });
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

  function filtro(fil) {
    const arrayFilter = appState.markers.filter(p => {
      return p.corMarker === fil;
    });
    setArrayExibir(arrayFilter);
  }

  return (
    <Box style={styles.container}>
      <Box style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require('../../assets/logo.png')}
          style={{width: '40%'}}
          resizeMode="contain"
        />
      </Box>

      <Animatable.View
        delay={600}
        animation="fadeInUp"
        style={{
          backgroundColor: colorThemeCard,
          flex: 3,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingStart: '5%',
          paddingEnd: '5%',
        }}>
        <Text
          style={styles.title}
          color={contrastTheme}
          alignSelf="center"
          bold>
          Meus Locais
        </Text>
        <ScrollView>
          <Box style={{flexDirection: 'row'}}>
            <Box style={styles.vBtFilter}>
              <ButtonPerson
                title={'Conhecido'}
                color={'#B1F9AF'}
                press={() => {
                  filtro('#4DDEA1');
                }}
              />
            </Box>
            <Box style={styles.vBtFilter}>
              <ButtonPerson
                title={'A Conhecer'}
                color={'#4D98DE'}
                press={() => {
                  filtro('#4D98DE');
                }}
              />
            </Box>
            <Box style={styles.vBtFilter}>
              <ButtonPerson
                title={'Evitar'}
                color={'#F8B9B9'}
                style={styles.vBtFilter}
                press={() => {
                  filtro('#DE4D4D');
                }}
              />
            </Box>
          </Box>
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
    </Box>
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
  title: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 18,
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
