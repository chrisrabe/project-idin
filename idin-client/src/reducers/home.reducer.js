import {
  CREATE_ORG_REQUEST,
  CREATE_ORG_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  SIGN_IN,
  SIGN_OUT,
} from 'actions/action.types';
import storeInitialState from 'store/initial.state';

const stateKey = 'home';
const initialState = storeInitialState[stateKey];

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { ...state, isCreatingUser: true };
    case CREATE_USER_SUCCESS:
      return { ...state, isCreatingUser: false, userId: action.userId };
    case CREATE_ORG_REQUEST:
      return { ...state, isCreatingOrg: true };
    case CREATE_ORG_SUCCESS:
      return { ...state, isCreatingOrg: false, orgId: action.orgId };
    case SIGN_IN:
      window.sessionStorage.setItem('userId', action.userId);
      window.sessionStorage.setItem('orgId', action.orgId);
      return { ...state, userId: action.userId, orgId: action.orgId };
    case SIGN_OUT:
      window.sessionStorage.removeItem('userId');
      window.sessionStorage.removeItem('orgId');
      return { ...state, userId: undefined, orgId: undefined };
    default:
      return state;
  }
}
