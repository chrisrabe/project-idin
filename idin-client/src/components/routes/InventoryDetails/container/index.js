import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as invActions from 'actions/api/inventory';
import InventoryDetails from '../index';

function mapStateToProps(state) {
  const { inventory } = state;
  return {
    selectedInventory: inventory.selectedInventory,
  };
}

function mapStateToDispatch(dispatch) {
  return {
    invActions: bindActionCreators(invActions, dispatch),
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(InventoryDetails);
