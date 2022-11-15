import {createContext} from 'react';

export type AppState = {
  isLoading: Boolean;
  coordsFocus: {
    latitude: number;
    longitude: number;
  };
  markers: Array<any>;
};

export const initialAppState: AppState = {
  isLoading: true,
  coordsFocus: {
    latitude: 0,
    longitude: 0,
  },
  markers: [],
};

export const AppContext = createContext({
  appState: initialAppState,
  setAppState: (state: AppState) => {},
});
