import React, { useCallback, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Grid, Button } from '@material-ui/core';
import NewInvForm from 'components/routes/Inventory/NewInvForm';
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
  max-height: 80%;
  overflow-y: scroll;
  width: 100%;
`;

const Inventory = (props) => {
  const {
    inventory, invActions, orgId, appActions, userId, items,
  } = props;

  useEffect(() => {
    if (orgId) {
      invActions.getInventoryList(orgId);
    }
  }, [invActions, orgId]);

  const handleUpdate = useCallback((id, newAmount) => {
    invActions.updateInventory(id, newAmount, userId, orgId);
  }, [invActions, orgId, userId]);

  const handleCreate = useCallback((newInv) => {
    if (newInv) {
      invActions.createInventory(newInv.itemId, newInv.amount, userId, orgId);
    }
  }, [invActions, orgId, userId]);

  const onCreateNew = useCallback(() => {
    const body = (
      <NewInvForm
        onSubmit={handleCreate}
        onClose={appActions.closeDialog}
        items={items}
      />
    );
    const title = 'Create new inventory';
    appActions.openDialog({ title, body });
  }, [handleCreate, appActions, items]);

  return (
    <MainContainer container>
      <HeaderContainer>
        <HeaderText variant="h4">Current Inventory</HeaderText>
      </HeaderContainer>
      <Button onClick={onCreateNew} variant="contained" color="primary">New inventory</Button>
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
