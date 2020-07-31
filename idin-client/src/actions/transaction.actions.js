import {
  REQUEST_TRANSACTION_LIST,
  SET_TRANSACTION_LIST,
  REQUEST_UPDATE_TRANSACTION
} from 'actions/action.types';

export const requestTransactionList = () => ({
  type: REQUEST_TRANSACTION_LIST,
});

export const setTransactionList = (transactions) => ({
  type: SET_TRANSACTION_LIST,
  transactions,
});

export const requestUpdateTransaction = () => ({
  type: REQUEST_UPDATE_TRANSACTION
})
