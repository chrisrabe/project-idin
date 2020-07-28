import {
  CREATE_ORG_REQUEST,
  CREATE_ORG_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  SIGN_IN,
  SIGN_OUT,
} from './action.types';

export const createOrgRequest = () => ({
  type: CREATE_ORG_REQUEST,
});

export const createOrgSuccess = (orgId) => ({
  type: CREATE_ORG_SUCCESS,
  orgId,
});

export const createUserRequest = () => ({
  type: CREATE_USER_REQUEST,
});

export const createUserSuccess = (userId) => ({
  type: CREATE_USER_SUCCESS,
  userId,
});

export const signIn = (userId, orgId) => ({
  type: SIGN_IN,
  userId,
  orgId,
});

export const signOut = () => ({
  type: SIGN_OUT,
});
