import {createContext} from 'react';

export type AppState = {
  isLoading: Boolean;
  coordsUser: {
    latitude: number;
    longitude: number;
  };
};

export const initialAppState: AppState = {
  isLoading: true,
  coordsUser: {
    latitude: 0,
    longitude: 0,
  },
};

export const AppContext = createContext({
  appState: initialAppState,
  setAppState: (state: AppState) => {},
});
