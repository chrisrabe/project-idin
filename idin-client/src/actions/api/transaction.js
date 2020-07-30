import axios from 'axios';
import config from 'config';
import {
  requestTransactionList,
  setTransactionList,
} from '../transaction.action';

const { server } = config;
const baseRoute = `${server.baseUrl}${server.api.v1}${server.route.transaction}`;

// eslint-disable-next-line import/prefer-default-export
export const getTransactionList = (orgId) => async (dispatch) => {
  dispatch(requestTransactionList());
  const { data } = await axios.get(baseRoute, {
    params: {
      orgId,
    },
  });
  const { inventory } = data;
  dispatch(setTransactionList(inventory));
};
