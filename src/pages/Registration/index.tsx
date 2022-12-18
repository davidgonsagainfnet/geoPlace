import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {Box, Text, ScrollView, useContrastText, useToast} from 'native-base';
import * as Animatable from 'react-native-animatable';
import InputText from '../../components/input/input';
import ButtonPerson from '../../components/button/buttonPerson';
import TextArea from '../../components/input/textArea';
import {AppContext} from '../../app/AppContext';
import {useNavigation} from '@react-navigation/native';
import cep from '../../api/cep';
import {useAppSelector, useAppDispatch, placeActions} from '../../app/appStore';
import InputNumber from '../../components/input/inputNumber';
import {useMutation} from '../../components/apollo/apolloClient';
import {mutationCreatePost} from '../../queries/mutationCreatePost';

export default function Registration() {
  const {appState, setAppState} = useContext(AppContext);
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
  const [findCep, setFindCep] = useState('');
  const [colorThemeCard, setColorThemeCard] = useState<String>('');
  const [contrastTheme, setContrastTheme] = useState<String>('');
  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);
  const placeFocus = useAppSelector(state => state.place.placeFocus);
  const [createPost, {loading}] = useMutation(mutationCreatePost);
  const toast = useToast();

  const dispatch = useAppDispatch();

  const colorTheme = isDarkTheme === true ? '#000' : '#fff';

  const contrastThemeLoad = useContrastText(colorTheme);

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

  async function salvar() {
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

    if (latitude === '') {
      Alert.alert('Error', 'Informe a Latitude', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    if (longtitude === '') {
      Alert.alert('Error', 'Informe a Longitude', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    if (corMarker === '#4DDEA1') {
      const {errors} = await createPost({
        variables: {
          latitude: latitude,
          longitude: longtitude,
          rua: rua,
          cidade: cidade,
          descricao: descricao,
          estado: estado,
          corMarker: corMarker,
          image: 'https://loremflickr.com/g/320/160/thailand/all',
        },
      });

      if (errors) {
        toast.show({
          description: 'Erro na publicação do post',
          backgroundColor: 'error.500',
        });
      } else {
        toast.show({
          description: 'Publicado com Sucesso',
          backgroundColor: 'success.500',
        });
      }
    }

    const arrayOriginal = appState.markers;
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

    setAppState({
      ...appState,
      markers: arrayTemp,
    });
    navigation.navigate('Home');
  }

  function bteditar(key2) {
    const arrayOriginal = appState.markers;
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

    setAppState({
      ...appState,
      markers: arrayEdit,
    });
    navigation.navigate('Home');
  }

  useEffect(() => {
    if (placeFocus.latitude !== '') {
      setLatitude(
        JSON.stringify(parseFloat(placeFocus.latitude), undefined, 2),
      );
      setLongtitude(
        JSON.stringify(parseFloat(placeFocus.longtitude), undefined, 2),
      );
    }

    if (placeFocus.rua !== '') {
      setRua(placeFocus.rua);
      setCidade(placeFocus.cidade);
      setEstado(placeFocus.estado);
      setDescricao(placeFocus.descricao);
      const cor =
        placeFocus.corMarker === '#4DDEA1'
          ? 'cc'
          : placeFocus.corMarker === '#4D98DE'
          ? 'cr'
          : 'e';
      setStatus(cor);
      setEditar(true);
      setEditKey(placeFocus.key);
    }
    clearPlaceFocus();
    setColorThemeCard(colorTheme);
    setContrastTheme(contrastThemeLoad);
  }, []);

  function clearPlaceFocus() {
    const placeFocus = {
      key: 0,
      latitude: '',
      longtitude: '',
      rua: '',
      cidade: '',
      descricao: '',
      estado: '',
      corMarker: '',
    };
    dispatch(
      placeActions.setPlace({
        place: placeFocus,
      }),
    );
  }

  async function buscarCep() {
    if (findCep !== '') {
      await cep.get('/' + findCep + '/json/').then(response => {
        setRua(response.data.logradouro);
        setCidade(response.data.localidade);
        setEstado(response.data.uf);
      });
    } else {
      Alert.alert('Cep', 'Informe um cep para buscar', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
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
          flex: 3,
          backgroundColor: colorThemeCard,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingStart: '5%',
          paddingEnd: '5%',
        }}>
        <Text style={styles.title} color={contrastTheme}>
          Cadastro de Local
        </Text>
        <ScrollView>
          <InputNumber
            title={'Longitude'}
            placeholder={'Informe a Longitude'}
            value={longtitude}
            colortext={contrastTheme}
          />
          <InputNumber
            title={'Latitude'}
            placeholder={'Informe a Latitude'}
            value={latitude}
            colortext={contrastTheme}
          />
          <Box style={styles.vBuscaCep}>
            <Box style={styles.vViewCep}>
              <InputNumber
                title={'Cep'}
                placeholder={'Informe um cep'}
                ChangeText={setFindCep}
                colortext={contrastTheme}
              />
            </Box>
            <Box style={styles.vViewCep}>
              <ButtonPerson
                title={'Informar o cep'}
                color={'#DBDE4D'}
                press={() => {
                  buscarCep();
                }}
              />
            </Box>
          </Box>
          <InputText
            title={'Rua'}
            placeholder={'Informe a Rua'}
            value={rua}
            ChangeText={setRua}
            colortext={contrastTheme}
          />
          <InputText
            title={'Cidade'}
            placeholder={'Informe a Cidade'}
            value={cidade}
            ChangeText={setCidade}
            colortext={contrastTheme}
          />
          <InputText
            title={'Estado'}
            placeholder={'Informe a Estado'}
            value={estado}
            ChangeText={setEstado}
            colortext={contrastTheme}
          />

          <TextArea
            title={'Descrição do Local'}
            placeholder={''}
            value={descricao}
            ChangeText={setDescricao}
            colortext={contrastTheme}
          />
          <Box style={styles.vBTOne}>
            <ButtonPerson
              title={'Conheço'}
              color={conhecido === false ? '#F8F8FF' : '#4DDEA1'}
              press={() => setStatus('cc')}
            />
          </Box>
          <Box style={styles.vBTOne}>
            <ButtonPerson
              title={'Quero Conheçer'}
              color={conhecer === false ? '#F8F8FF' : '#4D98DE'}
              press={() => setStatus('cr')}
            />
          </Box>
          <Box style={styles.vBTOne}>
            <ButtonPerson
              title={'Evitar'}
              color={evitar === false ? '#F8F8FF' : '#DE4D4D'}
              press={() => setStatus('e')}
            />
          </Box>
          <Box style={styles.vButtons}>
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
          </Box>
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
  vBuscaCep: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  vViewCep: {
    flex: 1,
    justifyContent: 'center',
  },
});
