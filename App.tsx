import React from 'react';
import {AppContainner} from './AppContainner';
import {
  appStore,
  AppStoreProvider,
  appActions,
  useAppDispatch,
  useAppSelector,
} from './src/app/appStore';

export default function App() {
  return (
    <AppStoreProvider store={appStore}>
      <AppContainner />
    </AppStoreProvider>
  );
}
