import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as orgApi from 'actions/api/organisation';
import SignInPanel from '../index';

function mapStateToProps(state, ownProps) {
  const { app } = state;
  return {
    orgs: app.orgs,
    value: ownProps.value,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    orgApi: bindActionCreators(orgApi, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPanel);
