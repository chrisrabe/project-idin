import {
  CREATE_ORG_REQUEST,
  CREATE_ORG_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
} from './action.types';

export const createOrgRequest = (userId, orgName, isSupplier) => ({
  type: CREATE_ORG_REQUEST,
  userId,
  orgName,
  isSupplier,
});

export const createOrgSuccess = (orgId) => ({
  type: CREATE_ORG_SUCCESS,
  orgId,
});

export const createUserRequest = (username, email) => ({
  type: CREATE_USER_REQUEST,
  username,
  email,
});

export const createUserSuccess = (userId) => ({
  type: CREATE_USER_SUCCESS,
  userId,
});
