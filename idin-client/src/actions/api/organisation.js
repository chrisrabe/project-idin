import axios from 'axios';
import config from 'config';
import {
  requestOrgs,
  receiveOrgs,
} from '../app.actions';
import {
  createOrgRequest,
  createOrgSuccess,
} from '../home.actions';

const { server } = config;
const baseRoute = `${server.baseUrl}${server.api.v1}${server.route.organisation}`;

export const getOrganisationList = () => async (dispatch) => {
  dispatch(requestOrgs());
  const { data } = await axios.get(baseRoute);
  const { organisations } = data;
  dispatch(receiveOrgs(organisations));
};

export const createOrganisation = (userId, orgName, isSupplier) => async (dispatch) => {
  dispatch(createOrgRequest());
  const reqData = {
    userId,
    orgName,
    isSupplier,
  };
  const { data } = await axios.post(baseRoute, reqData);
  dispatch(createOrgSuccess(data.data.id));
};
