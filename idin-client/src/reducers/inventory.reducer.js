import {
  SET_INVENTORY,
  SET_INVENTORY_LIST,
} from 'actions/action.types';
import storeInitialState from 'store/initial.state';

const stateKey = 'inventory';
const initialState = storeInitialState[stateKey];

export default function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INVENTORY_LIST:
      return { ...state, inventory: action.inventory };
    case SET_INVENTORY:
      return { ...state, selectedInventory: action.selectedInventory };
    default:
      return state;
  }
}
