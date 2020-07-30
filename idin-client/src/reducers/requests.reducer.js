import {
  SET_REQUEST_LIST,
} from 'actions/action.types';
import storeInitialState from 'store/initial.state';

const stateKey = 'requests';
const initialState = storeInitialState[stateKey];

export default function requestsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REQUEST_LIST:
      return { ...state, requests: action.requests };
    default:
      return state;
  }
}
