import { connect } from 'react-redux';
import Profile from '../index';

function mapStateToProps(state) {
  const { app, home } = state;
  return {
    userId: home.userId,
    orgId: home.orgId,
    users: app.users,
    orgs: app.orgs,
  };
}

export default connect(mapStateToProps)(Profile);
