import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const coordInitialState = {
  coordsFocus: {
    latitude: -52.09994673728943,
    longitude: -23.542958997475207,
  },
  markers: {
    key: 0,
    latitude: -52.09994673728943,
    longitude: -23.542958997475207,
    rua: '',
    cidade: '',
    descricao: '',
    estado: '',
    corMarker: '',
  },
};

type coordsFocusType = {
  latitude: number;
  longitude: number;
};

type markersFocusType = [
  {
    key: number;
    latitude: number;
    longitude: number;
    rua: string;
    cidade: string;
    descricao: string;
    estado: string;
    corMarker: string;
  },
];

export const coordSlice = createSlice({
  name: 'coord',
  initialState: coordInitialState,
  reducers: {
    setCoords(state, action: PayloadAction<{coords: coordsFocusType}>) {
      state.coordsFocus = action.payload.coords;
    },
    setMarkers(state, action: PayloadAction<{markers: markersFocusType[]}>) {
      state.markers = [state.markers, action.payload.markers];
    },
  },
});

export const coordActions = coordSlice.actions;
export const coordReducer = coordSlice.reducer;
