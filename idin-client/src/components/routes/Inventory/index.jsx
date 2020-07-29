import React, { useCallback, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import InventoryCard from './InventoryCard';

const MainContainer = styled.div`
  padding: 20px;
`;

const HeaderContainer = styled.div`
  height: 50px;
  margin-bottom: 10px;
`;

const HeaderText = styled(Typography)`
  color: white;
`;

const InventoryList = styled(Grid)`
  max-height: 60%;
  overflow-y: scroll;
`;

const Inventory = (props) => {
  const {
    inventory, invActions, orgId, appActions, userId,
  } = props;

  useEffect(() => {
    if (orgId) {
      invActions.getInventoryList(orgId);
    }
  }, [invActions, orgId]);

  const handleUpdate = useCallback((id, newAmount) => {
    invActions.updateInventory(id, newAmount, userId, orgId);
  }, [invActions, orgId, userId]);

  return (
    <MainContainer container>
      <HeaderContainer>
        <HeaderText variant="h4">Current Inventory</HeaderText>
      </HeaderContainer>
      <InventoryList container alignItems="flex-start">
        { inventory.map((item) => (
          <InventoryCard
            key={item.id}
            item={item}
            openDialog={appActions.openDialog}
            closeDialog={appActions.closeDialog}
            onUpdateItem={(newAmount) => handleUpdate(item.id, newAmount)}
          />
        ))}
      </InventoryList>
    </MainContainer>
  );
};

export default Inventory;
