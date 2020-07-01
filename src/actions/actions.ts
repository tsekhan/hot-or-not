import { TGameResult } from 'utils/store';
import TEMPERATURE_UNIT from 'TEMPERATURE_UNIT';
import {
  ADD_RESULT,
  IAddResultAction,
  ISetTemperatureUnitAction,
  SET_TEMPERATURE_UNIT,
} from './types';

export const addResult = (result: TGameResult): IAddResultAction => {
  return {
    type: ADD_RESULT,
    result,
  };
};

export const setTemperatureUnit = (
  temperatureUnit: TEMPERATURE_UNIT
): ISetTemperatureUnitAction => {
  return {
    type: SET_TEMPERATURE_UNIT,
    temperatureUnit,
  };
};
