import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Grid, Typography,
} from '@material-ui/core';
import { faShippingFast, faBoxes } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import LabeledIcon from 'components/ui/LabeledIcon';
import PropTypes from 'prop-types';
import UpdateForm from '../UpdateForm';

const MainContainer = styled(Grid)`
  margin: 10px;
`;

const BodyContainer = styled(Card)`
  padding: 20px;
`;

const BodyText = styled(Typography)`
  padding-top: 5px;
  font-weight: 300;
`;

const InventoryCard = (props) => {
  const { item, openDialog, closeDialog } = props;
  const history = useHistory();

  const navigateToDetails = useCallback(() => {
    history.push(`inventory/${item.id}`);
  }, [history, item.id]);

  const handleAdd = useCallback(() => {
    const body = <UpdateForm onClose={closeDialog} submitText="Add" onSubmit={(value) => console.log(`Adding ${value}`)} />;
    const title = 'Add items';
    openDialog({ title, body });
  }, [openDialog, closeDialog]);

  return (
    <MainContainer item container xs={3} alignItems="flex-start">
      <BodyContainer>
        <Grid container spacing={2}>
          <Grid item container xs={12} direction="row">
            <LabeledIcon icon={faShippingFast} label={item.inTransit} />
            <LabeledIcon icon={faBoxes} label={item.amount} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" noWrap>{item.name}</Typography>
            <BodyText variant="body1" display="block" noWrap>{ item.description || 'No description' }</BodyText>
          </Grid>
          <Grid item xs={12}>
            <Button color="default" onClick={navigateToDetails}>DETAILS</Button>
            <Button color="primary" onClick={handleAdd}>ADD</Button>
            <Button color="secondary">REMOVE</Button>
          </Grid>
        </Grid>
      </BodyContainer>
    </MainContainer>
  );
};

InventoryCard.propTypes = {
  item: PropTypes.any.isRequired,
  openDialog: PropTypes.func,
  closeDialog: PropTypes.func,
};

export default InventoryCard;
