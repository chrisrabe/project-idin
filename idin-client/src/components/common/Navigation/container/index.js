import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from 'actions/home.actions';
import Router from '../index';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    homeActions: bindActionCreators(homeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);
