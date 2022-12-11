import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Box, Text, useContrastText, Pressable} from 'native-base';
import * as Animatable from 'react-native-animatable';
import {FeedCard, FeedCardProps} from '../../components/card/FeedCard';
import {AppContext} from '../../app/AppContext';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../app/appStore';

export default function Feeds() {
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

  const cardList: Array<FeedCardProps> = Array.from(
    {length: 50},
    (_, index) => ({
      imageSrc: `https://loremflickr.com/g/320/160/thailand/all?param=${Math.random()}`,
      lat: Math.random() * -10,
      long: Math.random() * -10,
    }),
  );

  function openFeed(item: FeedCardProps) {
    const place = {
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.long),
      edit: false,
    };
    navigation.navigate('Registration', place);
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
          Indicações de Lugares
        </Text>
        <FlatList
          data={cardList}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                openFeed(item);
              }}>
              <FeedCard imageSrc={item.imageSrc} colorText={contrastTheme} />
            </Pressable>
          )}
        />
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
