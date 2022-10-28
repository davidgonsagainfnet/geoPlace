import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import InputText from '../../components/input/input';
import ButtonPerson from '../../components/button/buttonPerson';
import TextArea from '../../components/input/textArea';
import SwitchCuston from '../../components/input/switch';

export default function Registration() {
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
          <InputText title={'Longitude'} placeholder={'Informe a Longitude'} />
          <InputText title={'Latitude'} placeholder={'Informe a Latitude'} />
          <ButtonPerson
            title={'Buscar endereço por coordenadas'}
            color={'#4DDEA1'}
          />
          <ButtonPerson title={'Informar o cep'} color={'#DBDE4D'} />
          <InputText title={'Rua'} placeholder={'Informe a Rua'} />
          <InputText title={'Cidade'} placeholder={'Informe a Cidade'} />
          <InputText title={'Estado'} placeholder={'Informe a Estado'} />

          <TextArea title={'Descrição do Local'} placeholder={''} />
          <View style={styles.vSwitdual}>
            <SwitchCuston title={'Conheço'} />
            <SwitchCuston title={'Quero Conheçer'} />
          </View>
          <View style={styles.vSwitOne}>
            <SwitchCuston title={'Evitar'} />
          </View>
          <View style={styles.vButtons}>
            <ButtonPerson title={'Salvar Local'} color={'#4D98DE'} />
            <ButtonPerson title={'Fechar'} color={'#DE4D4D'} />
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
