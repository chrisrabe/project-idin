import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as orgApi from 'actions/api/organisation';
import * as userApi from 'actions/api/user';
import RegisterPanel from '../index';

function mapStateToProps(state, ownProps) {
  const { app, home } = state;
  return {
    orgs: app.orgs,
    value: ownProps.value,
    userId: home.userId,
    orgId: home.orgId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    orgApi: bindActionCreators(orgApi, dispatch),
    userApi: bindActionCreators(userApi, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPanel);
