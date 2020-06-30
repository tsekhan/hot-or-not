import { createStore } from 'redux';
import app from 'reducers/reducers';
import { LOCAL_STORAGE_KEY } from 'config';
import TEMPERATURE_UNIT from 'TEMPERATURE_UNIT';
import { IAppAction } from '../actions/types';

export interface IGameResult {
  firstCity: {
    country: string;
    name: string;
    temperatureInCelsius: number;
  };
  secondCity: {
    country: string;
    name: string;
    temperatureInCelsius: number;
  };
  isCorrect: boolean;
}

export interface IStoredData {
  score: number;
  temperatureUnit: TEMPERATURE_UNIT;
  history: IGameResult[];
}

const defaultData: IStoredData = {
  score: 0,
  temperatureUnit: TEMPERATURE_UNIT.CELSIUS,
  history: [],
};

const loadState = (): IStoredData => {
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

const saveState = (state: IStoredData) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
};

const persistedState = loadState();

export const store = createStore<IStoredData, IAppAction, unknown, unknown>(app, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});
