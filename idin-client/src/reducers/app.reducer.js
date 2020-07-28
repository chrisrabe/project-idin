import {
  REQUEST_USERS,
  REQUEST_ORGS,
  REQUEST_ITEMS,
  RECEIVE_USERS,
  RECEIVE_ORGS,
  RECEIVE_ITEMS,
} from 'actions/action.types';
import storeInitialState from 'store/initial.state';

const stateKey = 'app';
const initialState = storeInitialState[stateKey];

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USERS:
      return { ...state, isFetchingUsers: true };
    case REQUEST_ORGS:
      return { ...state, isFetchingOrgs: true };
    case REQUEST_ITEMS:
      return { ...state, isFetchingItems: true };
    case RECEIVE_USERS:
      return { ...state, isFetchingUsers: false, users: action.users };
    case RECEIVE_ORGS:
      return { ...state, isFetchingOrgs: false, orgs: action.orgs };
    case RECEIVE_ITEMS:
      return { ...state, isFetchingItems: false, items: action.items };
    default:
      return state;
  }
}
