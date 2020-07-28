import axios from 'axios';
import config from 'config';
import {
  requestUsers,
  receiveUsers,
} from '../app.actions';
import {
  createUserRequest,
  createUserSuccess,
} from '../home.actions';

const { server } = config;
const baseRoute = `${server.baseUrl}${server.api.v1}${server.route.user}`;

export const getUserList = () => async (dispatch) => {
  dispatch(requestUsers());
  const { data } = await axios.get(baseRoute);
  const { users } = data;
  dispatch(receiveUsers(users));
};

export const createUser = (username, email) => async (dispatch) => {
  dispatch(createUserRequest());
  const reqData = {
    username,
    email,
  };
  const { data } = await axios.post(baseRoute, reqData);
  dispatch(createUserSuccess(data.data.id));
};
