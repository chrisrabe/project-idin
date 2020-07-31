import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as reqAction from 'actions/api/requests';
import * as appAction from 'actions/app.actions';
import Request from '../index';

function mapStateToProps(state, ownProps) {
  const { home, inventory } = state;
  return {
    userId: home.userId,
    orgId: home.orgId,
    request: ownProps.request,
    isInbound: ownProps.isInbound,
    inventory: inventory.inventory,
  };
}

function mapStateToDispatch(dispatch) {
  return {
    appAction: bindActionCreators(appAction, dispatch),
    reqAction: bindActionCreators(reqAction, dispatch),
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(Request);
