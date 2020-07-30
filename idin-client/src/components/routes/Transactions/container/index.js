import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as transAction from 'actions/api/transaction';
import Inventory from '../index';

function mapStateToProps(state) {
  const { transaction, home } = state;
  return {
    transactions: transaction.transactions,
    orgId: home.orgId,
  };
}

function mapStateToDispatch(dispatch) {
  return {
    transAction: bindActionCreators(transAction, dispatch),
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(Inventory);
