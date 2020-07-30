import { REQUEST_TRANSACTION_LIST, SET_TRANSACTION_LIST } from 'actions/action.types';

export const requestTransactionList = () => ({
  type: REQUEST_TRANSACTION_LIST,
});

export const setTransactionList = (transactions) => ({
  type: SET_TRANSACTION_LIST,
  transactions,
});
