import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const HeaderContainer = styled(Grid)`
  padding: 20px;
`;

const Inventory = () => (
  <Grid container>
    <HeaderContainer item xs={12}>
      <Typography variant="h4">Profile</Typography>
    </HeaderContainer>
  </Grid>
);

export default Inventory;
