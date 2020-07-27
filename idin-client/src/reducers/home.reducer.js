import { SET_DEADLINE, SET_TIME_LEFT, DECREASE_TIME } from 'actions/action.types';
import storeInitialState from 'store/initial.state';

const stateKey = 'home';
const initialState = storeInitialState[stateKey];

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DEADLINE:
      return { ...state, home: { deadline: action.deadline } };
    case SET_TIME_LEFT:
      return { ...state, home: { timeLeft: action.timeLeft } };
    case DECREASE_TIME:
      return { ...state, home: { timeLeft: state.timeLeft - 1 } };
    default:
      return state;
  }
}
