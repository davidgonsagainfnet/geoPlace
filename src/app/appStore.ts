import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {persistReducer} from 'redux-persist';
export {Provider as AppStoreProvider} from 'react-redux';
import {appReducer} from '../slice/appSlice';
import {placeReducer} from '../slice/placeSlice';
import {recommendationReducer} from '../slice/recommendationSlice';
export {appActions} from '../slice/appSlice';
export {placeActions} from '../slice/placeSlice';
export {recommendationActions} from '../slice/recommendationSlice';

const persistConfig = {
  storage: AsyncStorage,
};

export const appStore = configureStore({
  reducer: {
    app: appReducer,
    place: placeReducer,
    recommendation: recommendationReducer,
  },
  devTools: true,
});

const persistedrecommendationReducer = persistReducer(
  {
    ...persistConfig,
    key: 'recommendation',
  },
  recommendationReducer,
);

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;
export const useAppDispatch: () => typeof appStore.dispatch = useDispatch;

export type AppStore = ReturnType<typeof appStore.getState>;
