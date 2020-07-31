import { connect } from 'react-redux';
import Router from '../index';

function mapStateToProps(state) {
  const { home } = state;
  return {
    userId: home.userId,
    orgId: home.orgId,
  };
}

export default connect(mapStateToProps)(Router);
