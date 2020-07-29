import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as invActions from 'actions/api/inventory';
import Inventory from '../index';

function mapStateToProps(state) {
  const { inventory, home } = state;
  return {
    orgId: home.orgId,
    inventory: inventory.inventory,
  };
}

function mapStateToDispatch(dispatch) {
  return {
    invActions: bindActionCreators(invActions, dispatch),
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(Inventory);
