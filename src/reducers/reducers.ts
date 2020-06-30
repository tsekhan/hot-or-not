import { ADD_RESULT, IAppAction, SET_TEMPERATURE_UNIT } from 'actions/types';

export default (state: any, action: IAppAction) => {
  switch (action.type) {
    case ADD_RESULT:
      return {
        ...state,
        results: [action.result, ...state.results],
      };
    case SET_TEMPERATURE_UNIT:
      return {
        ...state,
        temperatureUnit: action.temperatureUnit,
      };
    default:
      return state;
  }
};
