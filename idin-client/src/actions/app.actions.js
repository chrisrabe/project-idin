import {
  REQUEST_USERS,
  REQUEST_ORGS,
  REQUEST_ITEMS,
  RECEIVE_USERS,
  RECEIVE_ORGS,
  RECEIVE_ITEMS,
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from './action.types';

export const openDialog = (dialog) => ({
  type: OPEN_DIALOG,
  dialog,
});

export const closeDialog = () => ({
  type: CLOSE_DIALOG,
});

export const requestUsers = () => ({
  type: REQUEST_USERS,
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

export const requestOrgs = () => ({
  type: REQUEST_ORGS,
});

export const receiveOrgs = (orgs) => ({
  type: RECEIVE_ORGS,
  orgs,
});

export const requestItems = () => ({
  type: REQUEST_ITEMS,
});

export const receiveItems = (items) => ({
  type: RECEIVE_ITEMS,
  items,
});
