import {
  CREATE_ORG_REQUEST,
  CREATE_ORG_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
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
    default:
      return state;
  }
}
