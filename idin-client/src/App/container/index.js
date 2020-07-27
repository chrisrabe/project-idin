import { connect } from 'react-redux';
import App from '../index';

function mapStateToProps(state) {
  const { home } = state;
  return {
    deadline: home.deadline,
  };
}

export default connect(mapStateToProps)(App);
