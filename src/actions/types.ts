import { TGameResult } from 'utils/store';
import TEMPERATURE_UNIT from 'TEMPERATURE_UNIT';

export const ADD_RESULT = 'ADD_RESULT';
export const SET_TEMPERATURE_UNIT = 'SET_TEMPERATURE_UNIT';

export interface IAddResultAction {
  type: typeof ADD_RESULT;
  result: TGameResult;
}

export interface ISetTemperatureUnitAction {
  type: typeof SET_TEMPERATURE_UNIT;
  temperatureUnit: TEMPERATURE_UNIT;
}

export type IAppAction = IAddResultAction | ISetTemperatureUnitAction;
