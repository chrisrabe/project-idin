import {
  SET_TRANSACTION_LIST,
} from 'actions/action.types';
import storeInitialState from 'store/initial.state';

const stateKey = 'transaction';
const initialState = storeInitialState[stateKey];

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRANSACTION_LIST:
      return { ...state, transactions: action.transactions };
    default:
      return state;
  }
}
