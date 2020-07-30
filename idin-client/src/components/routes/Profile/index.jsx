import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import {
  List, ListItem, ListItemText, Paper, Grid
} from '@material-ui/core';

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

const StyledPaper = styled(Paper)`
  margin-bottom: 10px;
`;

const Profile = (props) => {
  const {
    userId, orgId, users, orgs,
  } = props;
  const [user, setUser] = useState(undefined);
  const [org, setOrg] = useState(undefined);

  useEffect(() => {
    setUser(users.filter((u) => u.id === userId)[0]);
    setOrg(orgs.filter((o) => o.id === orgId)[0]);
  }, [setOrg, setUser, userId, orgId, users, orgs]);

  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderText variant="h4">Profile Details</HeaderText>
      </HeaderContainer>
      <List>
        <StyledPaper>
          <ListItem>
            <Grid container>
              <Grid item xs={6}>
                <ListItemText>User</ListItemText>
              </Grid>
              <Grid item xs={6}>
                <ListItemText>{user && user.username}</ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        </StyledPaper>
        <StyledPaper>
          <ListItem>
            <Grid container>
              <Grid item xs={6}>
                <ListItemText>Email</ListItemText>
              </Grid>
              <Grid item xs={6}>
                <ListItemText>{user && user.email}</ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        </StyledPaper>
        <StyledPaper>
          <ListItem>
            <Grid container>
              <Grid item xs={6}>
                <ListItemText>Company</ListItemText>
              </Grid>
              <Grid item xs={6}>
                <ListItemText>{org && org.orgName}</ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        </StyledPaper>
      </List>
    </MainContainer>
  );
};

export default Profile;
