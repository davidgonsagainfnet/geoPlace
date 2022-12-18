import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {
  Box,
  Text,
  useContrastText,
  Pressable,
  Spinner,
  Center,
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import {FeedCard, FeedCardProps} from '../../components/card/FeedCard';
import {AppContext} from '../../app/AppContext';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {placeActions, useAppDispatch, useAppSelector} from '../../app/appStore';
import {useLazyQuery} from '../../components/apollo/apolloClient';
import {getPlacePage} from '../../queries/getPlacePage';

type FeedCardProps = {
  latitude: string;
  longitude: string;
  rua: string;
  cidade: string;
  descricao: string;
  estado: string;
  corMarker: string;
  image: string;
  createdAt: string;
};

function feedDecoder(data: any): FeedCardProps[] {
  if (data === undefined) {
    return [];
  }

  const {data: indicatedPlaces} = data.indicatedPlaces;
  const items = indicatedPlaces.map(
    ({
      attributes: {
        latitude,
        longitude,
        rua,
        cidade,
        descricao,
        estado,
        corMarker,
        image,
        createdAt,
      },
    }: any) => ({
      latitude,
      longitude,
      rua,
      cidade,
      descricao,
      estado,
      corMarker,
      image: `${image}?param=${Math.random()}`,
      createdAt,
    }),
  );

  return items;
}

const pageSize = 6;

export default function Feeds() {
  const dispatch = useAppDispatch();

  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);
  const {appState, setAppState} = useContext(AppContext);
  const [arrayExibir, setArrayExibir] = useState<Array<any>>([]);
  const [colorThemeCard, setColorThemeCard] = useState<String>('');
  const navigation = useNavigation();
  const [endReached, setEndReached] = useState(false);

  const SpaceCard = styled.View`
    margin: 10px;
  `;
  const colorTheme = isDarkTheme === true ? '#000' : '#fff';

  const contrastTheme = useContrastText(colorTheme);

  const [page, setPage] = useState(1);
  const [place, setPlace] = useState([] as FeedCardProps[]);

  const [funPlacePage, {loading}] = useLazyQuery(getPlacePage, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const nextPage = 1;
      const {data} = await funPlacePage({
        variables: {
          pageSize,
          page: nextPage,
        },
      });
      const respConvertAPI = feedDecoder(data);
      setPlace(respConvertAPI);
    });

    return unsubscribe;
  }, [navigation]);

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
    const placeFocus = {
      key: 0,
      latitude: item.latitude,
      longtitude: item.longitude,
      rua: item.rua,
      cidade: item.cidade,
      descricao: item.descricao,
      estado: item.estado,
      corMarker: item.corMarker,
    };
    dispatch(
      placeActions.setPlace({
        place: placeFocus,
      }),
    );
    navigation.navigate('Registration');
  }

  async function onEndReached() {
    if (loading || endReached) {
      return;
    }

    const nextPage = page + 1;

    const {data} = await funPlacePage({
      variables: {
        pageSize,
        page: nextPage,
      },
    });

    const respConvertAPI = feedDecoder(data);

    if (respConvertAPI.length < pageSize) {
      setEndReached(true);
    }

    setPage(nextPage);
    setPlace([...place, ...respConvertAPI]);
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
          data={place}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                openFeed(item);
              }}>
              <FeedCard
                imageSrc={item.image}
                colorText={contrastTheme}
                descricao={item.descricao}
                data={item.createdAt}
                cidade={item.cidade}
              />
            </Pressable>
          )}
          onEndReached={onEndReached}
        />
        {loading && (
          <Center>
            <Spinner size="lg" />
          </Center>
        )}
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
