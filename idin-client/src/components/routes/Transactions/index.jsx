import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import TransactionList from './TransactionList';

const MainContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

const HeaderContainer = styled.div`
  height: 50px;
`;

const HeaderText = styled(Typography)`
  color: white;
`;

const TransactionListContainer = styled(Grid)`
  width: 100%;
  padding: 20px;
`;

const Inventory = (props) => {
  const { transactions, transAction, orgId } = props;

  useEffect(() => {
    if (orgId) {
      transAction.getTransactionList(orgId);
    }
  }, [transAction, orgId]);

  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderText variant="h4">Transaction History</HeaderText>
      </HeaderContainer>
      <TransactionListContainer container alignItems="flex-start">
        <TransactionList transactions={transactions} orgId={orgId} />
      </TransactionListContainer>
    </MainContainer>
  );
};

export default Inventory;
