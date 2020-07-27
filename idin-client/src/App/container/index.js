import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from 'actions/home.actions';
import App from '../index';

function mapStateToProps(state) {
  const { home } = state;
  return {
    deadline: home.deadline,
    timeLeft: home.timeLeft,
  };
}

function mapStateToDispatch(dispatch) {
  return {
    homeActions: bindActionCreators(homeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(App);
