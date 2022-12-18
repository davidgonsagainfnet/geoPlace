import React, {useState, useEffect} from 'react';
import {StatusBar, Appearance} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';
import {AppContext, initialAppState} from './src/app/AppContext';
import Loader from './src/components/loader/loader';
import {NativeBaseProvider} from 'native-base';
import {appActions, useAppDispatch, useAppSelector} from './src/app/appStore';
import messaging from '@react-native-firebase/messaging';

function delay(seconds: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined);
    }, seconds * 1000);
  });
}

async function init() {
  await delay(2);
  return true;
}

export function AppContainner() {
  const [appState, setAppState] = useState(initialAppState);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.app.isLoading);

  useEffect(() => {
    messaging().getToken().then(console.log);
    dispatch(
      appActions.setDarkTheme({
        isDarkTheme: Appearance.getColorScheme() === 'dark',
      }),
    );
    init().then(isSuccess => {
      isSuccess === true &&
        dispatch(
          appActions.setLoading({
            isLoading: false,
          }),
        );
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <NativeBaseProvider>
      <AppContext.Provider value={{appState, setAppState}}>
        <NavigationContainer>
          <StatusBar backgroundColor="#4D98DE" barStyle="light-content" />
          <Routes />
        </NavigationContainer>
      </AppContext.Provider>
    </NativeBaseProvider>
  );
}
