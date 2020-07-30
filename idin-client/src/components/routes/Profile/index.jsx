import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const HeaderContainer = styled(Grid)`
  padding: 20px;
`;

const HeaderText = styled(Typography)`
  color: white;
`;

const Profile = () => (
  <Grid container>
    <HeaderContainer item xs={12}>
      <HeaderText variant="h4">Profile</HeaderText>
    </HeaderContainer>
  </Grid>
);

export default Profile;
