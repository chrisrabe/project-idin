import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as orgActions from 'actions/api/organisation';
import * as userActions from 'actions/api/user';
import * as itemActions from 'actions/api/item';
import App from '../index';

function mapStateToProps(state) {
  const { app } = state;
  return {
    orgs: app.orgs,
    users: app.users,
    items: app.items,
  };
}

function mapStateToDispatch(dispatch) {
  return {
    orgActions: bindActionCreators(orgActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    itemActions: bindActionCreators(itemActions, dispatch),
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(App);
