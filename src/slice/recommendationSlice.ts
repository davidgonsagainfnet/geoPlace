import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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

const appInitialState = {
  recommendation: [] as placeFocusType[],
};

export const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState: appInitialState,
  reducers: {
    setRecommendation(
      state,
      action: PayloadAction<{recommendation: placeFocusType[]}>,
    ) {
      state.recommendation = action.payload.recommendation;
    },
    addRecommendation(
      state,
      action: PayloadAction<{recommendation: placeFocusType[]}>,
    ) {
      state.recommendation = [
        ...state.recommendation,
        ...action.payload.recommendation,
      ];
    },
  },
});

export const recommendationActions = recommendationSlice.actions;
export const recommendationReducer = recommendationSlice.reducer;
