import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
export {Provider as AppStoreProvider} from 'react-redux';
import {appReducer} from './appSlice';
import {coordReducer} from '../slice/coordSlice';
export {appActions} from './appSlice';
export {coordActions} from '../slice/coordSlice';

export const appStore = configureStore({
  reducer: {
    app: appReducer,
    coord: coordReducer,
  },
  devTools: true,
});

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;
export const useAppDispatch: () => typeof appStore.dispatch = useDispatch;

export type AppStore = ReturnType<typeof appStore.getState>;
