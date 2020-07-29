import axios from 'axios';
import config from 'config';
import {
  requestUsers,
  receiveUsers,
} from '../app.actions';
import {
  createUserRequest,
  signIn,
} from '../home.actions';

const { server } = config;
const baseRoute = `${server.baseUrl}${server.api.v1}${server.route.user}`;
const orgRoute = `${server.baseUrl}${server.api.v1}${server.route.organisation}`;

export const getUserList = () => async (dispatch) => {
  dispatch(requestUsers());
  const { data } = await axios.get(baseRoute);
  const { users } = data;
  dispatch(receiveUsers(users));
};

export const createUser = (username, email, org) => async (dispatch) => {
  dispatch(createUserRequest());
  const reqData = {
    username,
    email,
  };
  const res = await axios.post(baseRoute, reqData);
  const userId = res.data.data.id;
  let orgId;
  if (org.id) {
    const newData = {
      email,
      organisationId: org.id,
    };
    // edit user to join organisation
    await axios.post(`${baseRoute}/${userId}`, newData);
    orgId = org.id;
  } else {
    const newData = {
      name: org.orgName,
      isSupplier: org.isSupplier,
      userId,
    };
    // create org
    const { data } = await axios.post(orgRoute, newData);
    orgId = data.data.id;
  }
  // if org id doesn't exist. create org
  // if org id exists, update user
  dispatch(signIn(userId, orgId));
};
