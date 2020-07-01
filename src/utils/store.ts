import { createStore } from 'redux';
import app from 'reducers/reducers';
import { LOCAL_STORAGE_KEY } from 'config';
import TEMPERATURE_UNIT from 'TEMPERATURE_UNIT';
import { IAppAction } from '../actions/types';

export type TCityData = {
  country: string;
  name: string;
  temperatureInCelsius: number;
};

export type TGameResult = {
  firstCity: TCityData;
  secondCity: TCityData;
  isCorrect: boolean;
};

export type TStoredData = {
  score: number;
  temperatureUnit: TEMPERATURE_UNIT;
  history: TGameResult[];
};

const defaultData: TStoredData = {
  score: 0,
  temperatureUnit: TEMPERATURE_UNIT.CELSIUS,
  history: [],
};

const loadState = (): TStoredData => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return defaultData;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return defaultData;
  }
};

const saveState = (state: TStoredData) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
};

const persistedState = loadState();

export const store = createStore<TStoredData, IAppAction, unknown, unknown>(app, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});
