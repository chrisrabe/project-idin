import axios from 'axios';
import config from 'config';
import {
  requestItems,
  receiveItems,
} from '../app.actions';

const { server } = config;
const baseRoute = `${server.baseUrl}${server.api.v1}${server.route.items}`;

// eslint-disable-next-line import/prefer-default-export
export const getItemList = () => async (dispatch) => {
  dispatch(requestItems());
  const { data } = await axios.get(baseRoute);
  const { items } = data;
  dispatch(receiveItems(items));
};
