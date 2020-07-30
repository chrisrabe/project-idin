import {
  REQUEST_REQUEST_LIST,
  SET_REQUEST_LIST,
} from './action.types';

export const requestRequestList = () => ({
  type: REQUEST_REQUEST_LIST,
});

export const setRequestList = (requests) => ({
  type: SET_REQUEST_LIST,
  requests,
});
