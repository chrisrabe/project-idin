import React from 'react';
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

const InventoryList = styled(Grid)`
  max-height: 60%;
  overflow-y: scroll;
`;

const Inventory = (props) => {
  const { inventory } = props;
  return (
    <MainContainer container>
      <HeaderContainer>
        <Typography variant="h4">Current Inventory</Typography>
      </HeaderContainer>
      <InventoryList container alignItems="flex-start">
        { inventory.map((item) => (
          <InventoryCard key={item.id} item={item} />
        ))}
      </InventoryList>
    </MainContainer>
  );
};

export default Inventory;
