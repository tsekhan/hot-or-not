import { ADD_RESULT, IAppAction, SET_TEMPERATURE_UNIT } from 'actions/types';

export default (state: any, action: IAppAction) => {
  switch (action.type) {
    case ADD_RESULT:
      return {
        ...state,
        score: state.score + (action.result.isCorrect ? 1 : -1),
        history: [action.result, ...state.history],
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
