import {
  requestInventory,
  setInventory,
  requestInventoryList,
  setInventoryList,
  requestUpdateInventory,
  requestCreateInventory,
} from 'actions/inventory.actions';
import axios from 'axios';
import config from 'config';

const { server } = config;
const baseRoute = `${server.baseUrl}${server.api.v1}${server.route.inventory}`;

export const getInventoryList = (orgId) => async (dispatch) => {
  dispatch(requestInventoryList());
  const { data } = await axios.get(baseRoute, {
    params: {
      orgId,
    },
  });
  const { inventory } = data;
  dispatch(setInventoryList(inventory));
};

export const getInventoryDetails = (id) => async (dispatch) => {
  dispatch(requestInventory());
  const { data } = await axios.get(`${baseRoute}/${id}`);
  const { inventory } = data;
  dispatch(setInventory(inventory));
};

export const updateInventory = (id, amount, userId, orgId) => async (dispatch) => {
  dispatch(requestUpdateInventory());
  // update inventory
  await axios.post(`${baseRoute}/${id}`, { amount, userId });
  // update inventory list
  const { data } = await axios.get(baseRoute, {
    params: {
      orgId,
    },
  });
  const { inventory } = data;
  dispatch(setInventoryList(inventory));
};

export const createInventory = (itemId, amount, userId, orgId) => async (dispatch) => {
  dispatch(requestCreateInventory());
  // create inventory
  await axios.post(`${baseRoute}`, {
    itemId, amount, userId, owner: orgId, unitType: 'BOXES',
  });
  // update inventory list
  const { data } = await axios.get(baseRoute, {
    params: {
      orgId,
    },
  });
  const { inventory } = data;
  dispatch(setInventoryList(inventory));
};
