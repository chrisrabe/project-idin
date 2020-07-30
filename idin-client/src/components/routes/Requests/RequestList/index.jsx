import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Request from './Request';

const RequestList = (props) => {
  const { requests, orgId } = props;
  return (
    <List>
      {requests.map((req) => (
        <Request key={req.id} request={req} isInbound={req.reqOrigin !== orgId} />
      ))}
    </List>
  );
};

RequestList.propTypes = {
  requests: PropTypes.array.isRequired,
  orgId: PropTypes.string.isRequired,
};

export default RequestList;
