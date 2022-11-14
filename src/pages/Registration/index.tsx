import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  AppState,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import InputText from '../../components/input/input';
import ButtonPerson from '../../components/button/buttonPerson';
import TextArea from '../../components/input/textArea';
import type {ScreenStackProps} from 'react-native-screens';
import type {ParamListBase} from '@react-navigation/native';
import {AppContext} from '../../app/AppContext';
import {useNavigation} from '@react-navigation/native';

export default function Registration({route}: ScreenStackProps<ParamListBase>) {
  const [latitude, setLatitude] = useState('');
  const [longtitude, setLongtitude] = useState('');
  const [conhecer, setConhecer] = useState(false);
  const [evitar, setEvitar] = useState(false);
  const [conhecido, setConhecido] = useState(false);
  const [rua, setRua] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [descricao, setDescricao] = useState('');
  const [corMarker, setCorMarker] = useState('');
  const [escolhaStatus, setEscolhaStatus] = useState(false);
  const [editar, setEditar] = useState(false);
  const [editKey, setEditKey] = useState(0);
  const navigation = useNavigation();

  function setStatus(status) {
    setConhecer(false);
    setConhecido(false);
    setEvitar(false);
    setEscolhaStatus(true);
    switch (status) {
      case 'cr':
        setConhecer(true);
        setCorMarker('#4D98DE');
        break;
      case 'cc':
        setConhecido(true);
        setCorMarker('#4DDEA1');
        break;
      default:
        setEvitar(true);
        setCorMarker('#DE4D4D');
    }
  }

  function salvar() {
    if (cidade === '') {
      Alert.alert('Error', 'Informe a cidade', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    if (estado === '') {
      Alert.alert('Error', 'Informe a estado', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    if (descricao === '') {
      Alert.alert('Error', 'Informe a descrição', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    if (escolhaStatus === false) {
      Alert.alert(
        'Error',
        'Escolha uma das opções (Conheço, Quero Conhecer ou Evitar)',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
      return;
    }

    const arrayOriginal = AppContext._currentValue.appState.markers;
    let arrayTemp = [
      ...arrayOriginal,
      {
        key: arrayOriginal.length + 1,
        latitude: latitude,
        longtitude: longtitude,
        rua: rua,
        cidade: cidade,
        descricao: descricao,
        estado: estado,
        corMarker: corMarker,
      },
    ];
    AppContext._currentValue.appState.markers = arrayTemp;
    console.log(AppContext._currentValue.appState.markers);
    navigation.navigate('Home');
  }

  function bteditar(key2) {
    const arrayOriginal = AppContext._currentValue.appState.markers;
    let arrayTemp = arrayOriginal.filter(p => {
      return p.key !== key2;
    });

    let arrayEdit = [
      ...arrayTemp,
      {
        key: key2,
        latitude: latitude,
        longtitude: longtitude,
        rua: rua,
        cidade: cidade,
        descricao: descricao,
        estado: estado,
        corMarker: corMarker,
      },
    ];

    AppContext._currentValue.appState.markers = arrayEdit;
    console.log(AppContext._currentValue.appState.markers);
    navigation.navigate('Home');
  }

  useEffect(() => {
    setLatitude(JSON.stringify(route.params.latitude, undefined, 2));
    setLongtitude(JSON.stringify(route.params.longitude, undefined, 2));
    if (typeof route.params.rua !== 'undefined') {
      setRua(route.params.rua);
      setCidade(route.params.cidade);
      setEstado(route.params.estado);
      setDescricao(route.params.descricao);
      const cor =
        route.params.corMarker === '#4DDEA1'
          ? 'cc'
          : route.params.corMarker === '#4D98DE'
          ? 'cr'
          : 'e';
      setStatus(cor);
      setEditar(true);
      setEditKey(route.params.key);
      console.log('####################');
      console.log(route.params.key);
    }
  }, []);

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
        <Text style={styles.title}>Cadastro de Local</Text>
        <ScrollView>
          <InputText
            title={'Longitude'}
            placeholder={'Informe a Longitude'}
            value={longtitude}
          />
          <InputText
            title={'Latitude'}
            placeholder={'Informe a Latitude'}
            value={latitude}
          />
          <ButtonPerson title={'Buscar por coordenadas'} color={'#4DDEA1'} />
          <ButtonPerson title={'Informar o cep'} color={'#DBDE4D'} />
          <InputText
            title={'Rua'}
            placeholder={'Informe a Rua'}
            value={rua}
            ChangeText={setRua}
          />
          <InputText
            title={'Cidade'}
            placeholder={'Informe a Cidade'}
            value={cidade}
            ChangeText={setCidade}
          />
          <InputText
            title={'Estado'}
            placeholder={'Informe a Estado'}
            value={estado}
            ChangeText={setEstado}
          />

          <TextArea
            title={'Descrição do Local'}
            placeholder={''}
            value={descricao}
            ChangeText={setDescricao}
          />
          <View style={styles.vBTOne}>
            <ButtonPerson
              title={'Conheço'}
              textColor={'#000'}
              color={conhecido === false ? '#F8F8FF' : '#4DDEA1'}
              press={() => setStatus('cc')}
            />
          </View>
          <View style={styles.vBTOne}>
            <ButtonPerson
              title={'Quero Conheçer'}
              textColor={'#000'}
              color={conhecer === false ? '#F8F8FF' : '#4D98DE'}
              press={() => setStatus('cr')}
            />
          </View>
          <View style={styles.vBTOne}>
            <ButtonPerson
              title={'Evitar'}
              textColor={'#000'}
              color={evitar === false ? '#F8F8FF' : '#DE4D4D'}
              press={() => setStatus('e')}
            />
          </View>
          <View style={styles.vButtons}>
            <ButtonPerson
              title={editar ? 'Editar Local' : 'Salvar Local'}
              color={'#4D98DE'}
              press={() => {
                if (editar) {
                  bteditar(editKey);
                } else {
                  salvar();
                }
              }}
            />
          </View>
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
  vBTdual: {
    flexDirection: 'row',
    marginTop: 15,
  },
  vBTOne: {
    marginBottom: 15,
  },
  vButtons: {
    marginTop: 50,
  },
});
