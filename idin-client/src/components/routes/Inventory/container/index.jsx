import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as invActions from 'actions/api/inventory';
import * as appActions from 'actions/app.actions';
import Inventory from '../index';

function mapStateToProps(state) {
  const { inventory, home, app } = state;
  return {
    userId: home.userId,
    orgId: home.orgId,
    inventory: inventory.inventory,
    items: app.items,
  };
}

function mapStateToDispatch(dispatch) {
  return {
    invActions: bindActionCreators(invActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(Inventory);
