import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as transAction from 'actions/api/transaction';
import Transaction from '../index';

function mapStateToProps(state, ownProps) {
  const { home } = state;
  return {
    userId: home.userId,
    orgId: ownProps.orgId,
    transaction: ownProps.transaction,
  };
}

function mapStateToDispatch(dispatch) {
  return {
    transAction: bindActionCreators(transAction, dispatch),
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(Transaction);
