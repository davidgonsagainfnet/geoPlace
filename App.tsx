import React from 'react';
import {AppContainner} from './AppContainner';
import {
  appStore,
  AppStoreProvider,
  appActions,
  useAppDispatch,
  useAppSelector,
} from './src/app/appStore';
import {
  apolloClient,
  ApolloProvider,
} from './src/components/apollo/apolloClient';

export default function App() {
  return (
    <AppStoreProvider store={appStore}>
      <ApolloProvider client={apolloClient}>
        <AppContainner />
      </ApolloProvider>
    </AppStoreProvider>
  );
}
