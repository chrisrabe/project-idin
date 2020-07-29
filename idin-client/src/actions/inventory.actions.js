import {
  REQUEST_INVENTORY,
  REQUEST_INVENTORY_LIST,
  SET_INVENTORY,
  SET_INVENTORY_LIST,
} from './action.types';

export const requestInventory = () => ({
  type: REQUEST_INVENTORY,
});

export const requestInventoryList = () => ({
  type: REQUEST_INVENTORY_LIST,
});

export const setInventoryList = (inventory) => ({
  type: SET_INVENTORY_LIST,
  inventory,
});

export const setInventory = (selectedInventory) => ({
  type: SET_INVENTORY,
  selectedInventory,
});
