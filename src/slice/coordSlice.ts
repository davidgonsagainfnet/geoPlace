import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const coordInitialState = {
  coordsFocus: {
    latitude: 0,
    longitude: 0,
  },
};

type coordsFocusType = {
  latitude: number;
  longitude: number;
};

export const coordSlice = createSlice({
  name: 'coord',
  initialState: coordInitialState,
  reducers: {
    setCoords(state, action: PayloadAction<{coords: coordsFocusType}>) {
      state.coordsFocus = action.payload.coords;
    },
  },
});

export const coordActions = coordSlice.actions;
export const coordReducer = coordSlice.reducer;
