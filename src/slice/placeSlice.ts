import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const placeInitialState = {
  placeFocus: {
    key: 0,
    latitude: '',
    longtitude: '',
    rua: '',
    cidade: '',
    descricao: '',
    estado: '',
    corMarker: '',
  },
};

type placeFocusType = {
  key: number;
  latitude: string;
  longtitude: string;
  rua: string;
  cidade: string;
  descricao: string;
  estado: string;
  corMarker: string;
};

export const placeSlice = createSlice({
  name: 'place',
  initialState: placeInitialState,
  reducers: {
    setPlace(state, action: PayloadAction<{place: placeFocusType}>) {
      state.placeFocus = action.payload.place;
    },
  },
});

export const placeActions = placeSlice.actions;
export const placeReducer = placeSlice.reducer;
