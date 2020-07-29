import React, { useCallback, useEffect, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import LabeledIcon from 'components/ui/LabeledIcon';
import { faShippingFast, faBoxes } from '@fortawesome/free-solid-svg-icons';
import { ArrowBack } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const HeaderContainer = styled(Grid)`
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const HeaderText = styled(Typography)`
  color: white;
`;

const StyledIconButton = styled(IconButton)`
  color: white;
`;

const TopContainer = styled.div`
  width: 100%;
`;

const InventoryDetails = (props) => {
  const { selectedInventory, invActions } = props;
  const { id } = useParams();

  const history = useHistory();

  useEffect(() => {
    invActions.getInventoryDetails(id);
  }, [id, invActions]);

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return useMemo(() => {
    const title = selectedInventory ? selectedInventory.name : 'Inventory Details';
    const inTransit = selectedInventory ? selectedInventory.inTransit : 0;
    const amount = selectedInventory ? selectedInventory.amount : 0;
    const description = selectedInventory ? selectedInventory.description : 'No description';

    return (
      <TopContainer>
        <Grid container>
          <HeaderContainer item xs={6}>
            <StyledIconButton onClick={goBack}>
              <ArrowBack fontSize="large" />
            </StyledIconButton>
            <HeaderText variant="h4">{title}</HeaderText>
          </HeaderContainer>
          <HeaderContainer item container xs={6} direction="row" alignContent="center" justify="flex-end">
            <LabeledIcon icon={faShippingFast} label={inTransit} color="#F2F2F2" size="3x" />
            <LabeledIcon icon={faBoxes} label={amount} color="#F2F2F2" size="3x" />
          </HeaderContainer>
        </Grid>
      </TopContainer>
    );
  }, [selectedInventory]);
};

export default InventoryDetails;
