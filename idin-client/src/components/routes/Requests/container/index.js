import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as reqAction from 'actions/api/requests';
import * as invActions from 'actions/api/inventory';
import Requests from '../index';

function mapStateToProps(state) {
  const { requests, home } = state;
  return {
    requests: requests.requests,
    orgId: home.orgId,
  };
}

function mapStateToDispatch(dispatch) {
  return {
    reqAction: bindActionCreators(reqAction, dispatch),
    invActions: bindActionCreators(invActions, dispatch),
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(Requests);
