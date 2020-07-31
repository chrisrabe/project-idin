import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from 'actions/app.actions';
import * as orgActions from 'actions/api/organisation';
import * as userActions from 'actions/api/user';
import * as itemActions from 'actions/api/item';
import * as homeActions from 'actions/home.actions';
import App from '../index';

function mapStateToProps(state) {
  const { app } = state;
  return {
    orgs: app.orgs,
    users: app.users,
    items: app.items,
    dialog: app.dialog,
  };
}

function mapStateToDispatch(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    orgActions: bindActionCreators(orgActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    itemActions: bindActionCreators(itemActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(App);
