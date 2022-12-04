import React, {useState, useEffect} from 'react';
import {StatusBar, Appearance} from 'react-native';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import Routes from './src/routes';
import {AppContext, initialAppState} from './src/app/AppContext';
import Loader from './src/components/loader/loader';
import {NativeBaseProvider} from 'native-base';

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

export default function App() {
  const [appState, setAppState] = useState(initialAppState);

  useEffect(() => {
    init().then(isSuccess => {
      isSuccess === true &&
        setAppState({
          ...appState,
          isLoading: false,
          isDarkTheme: Appearance.getColorScheme() === 'dark',
        });
    });
  }, []);

  if (appState.isLoading) {
    return <Loader />;
  }

  return (
    <NativeBaseProvider>
      <AppContext.Provider value={{appState, setAppState}}>
        <NavigationContainer theme={DarkTheme}>
          <StatusBar backgroundColor="#4D98DE" barStyle="light-content" />
          <Routes />
        </NavigationContainer>
      </AppContext.Provider>
    </NativeBaseProvider>
  );
}
