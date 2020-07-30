import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Button, Typography,
} from '@material-ui/core';
import styled from 'styled-components';

const MainContainer = styled(Paper)`
  margin: 10px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Request = (props) => {
  const { request, isInbound } = props;
  return useMemo(() => {
    const buttonText = isInbound ? 'Respond' : 'View';
    const user = isInbound ? `From: ${request.originCompany}` : `To: ${request.destCompany}`;
    return (
      <MainContainer>
        <ListItem>
          <Grid container direction="row">
            <Grid item xs={3}>
              <ListItemText>
                <Typography variant="body2">{user}</Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="h4">{request.itemName}</Typography>
              </ListItemText>
            </Grid>
            <Grid item xs={7}>
              <ListItemText>
                <Typography variant="body1">{request.message}</Typography>
              </ListItemText>
            </Grid>
            <Grid item container xs={2} justify="flex-end">
              <Container>
                <Button variant="contained" color="primary">{buttonText}</Button>
              </Container>
            </Grid>
          </Grid>
        </ListItem>
      </MainContainer>
    );
  }, [request, isInbound]);
};

Request.propTypes = {
  request: PropTypes.any.isRequired,
  isInbound: PropTypes.bool,
};

export default Request;