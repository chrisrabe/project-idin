import axios from 'axios';
import config from 'config';
import {
  requestTransactionList,
  setTransactionList,
  requestUpdateTransaction
} from 'actions/transaction.actions';

const { server } = config;
const baseRoute = `${server.baseUrl}${server.api.v1}${server.route.transaction}`;

export const getTransactionList = (orgId) => async (dispatch) => {
  dispatch(requestTransactionList());
  const { data } = await axios.get(baseRoute, {
    params: {
      orgId,
    },
  });
  const { transactions } = data;
  dispatch(setTransactionList(transactions));
};

export const updateTransaction = (transId, userId, status, orgId) => async (dispatch) => {
  dispatch(requestUpdateTransaction());
  // update transaction
  await axios.post(`${baseRoute}/${transId}`, { userId, status });
  // reset list
  const { data } = await axios.get(baseRoute, {
    params: {
      orgId,
    },
  });
  const { transactions } = data;
  dispatch(setTransactionList(transactions));
};
