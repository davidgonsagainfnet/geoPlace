import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
export {Provider as AppStoreProvider} from 'react-redux';
import {appReducer} from '../slice/appSlice';
import {placeReducer} from '../slice/placeSlice';
export {appActions} from '../slice/appSlice';
export {placeActions} from '../slice/placeSlice';

export const appStore = configureStore({
  reducer: {
    app: appReducer,
    place: placeReducer,
  },
  devTools: true,
});

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;
export const useAppDispatch: () => typeof appStore.dispatch = useDispatch;

export type AppStore = ReturnType<typeof appStore.getState>;
