import { createStore } from 'redux';
import app from 'reducers/reducers';
import { LOCAL_STORAGE_KEY } from 'config';
import TEMPERATURE_UNIT from 'TEMPERATURE_UNIT';
import { IAppAction } from 'actions/types';

/**
 * Single city weather data
 */
export type TCityData = {
  /**
   * Human-readable country name
   */
  country: string;

  /**
   * City name
   */
  name: string;

  /**
   * Temperature in Celsius
   */
  temperatureInCelsius: number;
};

/**
 * Results of game round
 */
export type TGameResult = {
  firstCity: TCityData;
  secondCity: TCityData;
  isCorrect: boolean;
};

/**
 * Data handled by Redux storage
 */
export type TStoredData = {
  score: number;
  temperatureUnit: TEMPERATURE_UNIT;
  history: TGameResult[];
};

/**
 * Default data
 */
const defaultData: TStoredData = {
  score: 0,
  temperatureUnit: TEMPERATURE_UNIT.CELSIUS,
  history: [],
};

/**
 * Load state from local storage
 */
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

/**
 * Serialize state to local storage
 * @param state
 */
const saveState = (state: TStoredData) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
};

const persistedState = loadState();

export const store = createStore<TStoredData, IAppAction, unknown, unknown>(app, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});
