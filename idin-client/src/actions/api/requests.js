import axios from 'axios';
import config from 'config';
import {
  requestRequestList,
  setRequestList,
} from '../requests.actions';

const { server } = config;
const baseRoute = `${server.baseUrl}${server.api.v1}${server.route.requests}`;

// eslint-disable-next-line import/prefer-default-export
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
