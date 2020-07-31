import axios from 'axios';
import config from 'config';
import { reqStatus, unitTypes, transactionType } from 'utils/constants';
import {
  requestRequestList,
  setRequestList,
  confirmRequest,
  declineRequest,
} from '../requests.actions';

const { server } = config;
const baseRoute = `${server.baseUrl}${server.api.v1}${server.route.requests}`;
const transRoute = `${server.baseUrl}${server.api.v1}${server.route.transaction}`;

export const getRequestList = (orgId) => async (dispatch) => {
  dispatch(requestRequestList());
  const { data } = await axios.get(baseRoute, {
    params: {
      orgId,
    },
  });
  const { requests } = data;
  dispatch(setRequestList(requests));
};

export const sendConfirmRequest = (
  request,
  userId,
  orgId,
  itemId,
  amount,
  isPaymentRequired,
) => async (dispatch) => {
  dispatch(confirmRequest());
  // create transaction
  const newTrans = {
    itemId,
    amount,
    unitType: unitTypes.boxes,
    userId,
    origin: orgId,
    destination: request.reqOrigin, // where request came from
    type: transactionType.donate,
    isPaymentRequired,
  };
  const { data } = await axios.post(`${transRoute}`, newTrans);
  const reqData = {
    status: reqStatus.confirmed,
    responderId: userId,
    transactionId: data.data.id,
  };
  // update request
  await axios.post(`${baseRoute}/${request.id}`, reqData);
  // reload request list
  const { data: listData } = await axios.get(baseRoute, {
    params: {
      orgId,
    },
  });
  const { requests } = listData;
  dispatch(setRequestList(requests));
};

export const sendDeclineRequest = (reqId, userId, orgId) => async (dispatch) => {
  dispatch(declineRequest());
  const reqData = {
    status: reqStatus.declined,
    responderId: userId,
  };
  // send request over
  await axios.post(`${baseRoute}/${reqId}`, reqData);
  // reload request list
  const { data } = await axios.get(baseRoute, {
    params: {
      orgId,
    },
  });
  const { requests } = data;
  dispatch(setRequestList(requests));
};
