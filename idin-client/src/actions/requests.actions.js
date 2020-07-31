import {
  REQUEST_REQUEST_LIST,
  SET_REQUEST_LIST,
  CONFIRM_REQUEST,
  DECLINE_REQUEST,
} from './action.types';

export const requestRequestList = () => ({
  type: REQUEST_REQUEST_LIST,
});

export const setRequestList = (requests) => ({
  type: SET_REQUEST_LIST,
  requests,
});

export const confirmRequest = () => ({
  type: CONFIRM_REQUEST,
});

export const declineRequest = () => ({
  type: DECLINE_REQUEST,
});
