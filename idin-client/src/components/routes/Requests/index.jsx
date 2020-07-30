import React, { useEffect, useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import RequestList from 'components/routes/Requests/RequestList';
import { reqStatus } from 'utils/constants';

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
  return useMemo(() => {
    const inboundReqs = [];
    const outboundReqs = [];
    for (const req of requests) {
      if (req.reqOrigin === orgId && req.status === reqStatus.pending) {
        outboundReqs.push(req);
      } else if (req.status === reqStatus.pending) {
        inboundReqs.push(req);
      }
    }
    return (
      <MainContainer>
        <HeaderContainer>
          <HeaderText variant="h4">Requests</HeaderText>
        </HeaderContainer>
        <HeaderText variant="h5">
          {`Inbound Requests (${inboundReqs.length})`}
        </HeaderText>
        <RequestList requests={inboundReqs} orgId={orgId} />
        <HeaderText variant="h5">
          {`Outbound Requests (${outboundReqs.length})`}
        </HeaderText>
        <RequestList requests={outboundReqs} orgId={orgId} />
      </MainContainer>
    );
  }, [requests, orgId]);
};

export default Requests;
