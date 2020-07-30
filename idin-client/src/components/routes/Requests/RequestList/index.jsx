import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import styled from 'styled-components';
import Request from './Request';

const ListContainer = styled(List)`
  height: 300px;
  margin-bottom: 10px;
  overflow-y: scroll;
`;

const RequestList = (props) => {
  const { requests, orgId } = props;
  return (
    <ListContainer>
      {requests.map((req) => (
        <Request key={req.id} request={req} isInbound={req.reqOrigin !== orgId} />
      ))}
    </ListContainer>
  );
};

RequestList.propTypes = {
  requests: PropTypes.array.isRequired,
  orgId: PropTypes.string.isRequired,
};

export default RequestList;
