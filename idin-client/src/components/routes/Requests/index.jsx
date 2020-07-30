import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import {
  List, ListItem, ListItemText, Paper,
} from '@material-ui/core';
import RequestList from 'components/routes/Requests/RequestList';

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

const Requests = (props) => {
  const { orgId, reqAction, requests } = props;

  useEffect(() => {
    if (orgId) {
      reqAction.getRequestList(orgId);
    }
  }, [reqAction, orgId]);

  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderText variant="h4">Requests</HeaderText>
      </HeaderContainer>
      <RequestList requests={requests} orgId={orgId} />
    </MainContainer>
  );
};

export default Requests;
