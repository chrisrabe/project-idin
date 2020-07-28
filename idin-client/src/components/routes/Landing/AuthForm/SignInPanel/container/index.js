import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from 'actions/home.actions';
import SignInPanel from '../index';

function mapStateToProps(state, ownProps) {
  const { app } = state;
  return {
    users: app.users,
    value: ownProps.value,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    homeActions: bindActionCreators(homeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPanel);
