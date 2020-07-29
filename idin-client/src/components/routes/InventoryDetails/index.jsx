import React, { useCallback, useEffect, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import LabeledIcon from 'components/ui/LabeledIcon';
import {
  faShippingFast, faBoxes, faChartLine, faFire, faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { ArrowBack } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import InfoPanel from './InfoPanel';

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

const BodyContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const DescriptionText = styled(Typography)`
  padding: 20px;
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
    const consumption = selectedInventory && selectedInventory.consumption ? selectedInventory.consumption : 'N/A';
    const daysLeft = selectedInventory && selectedInventory.daysLeft ? selectedInventory.daysLeft : 'N/A';
    const outgoingReqs = selectedInventory && selectedInventory.outgoingReqs
      ? selectedInventory.outgoingReqs : 0;

    return (
      <MainContainer>
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
              <LabeledIcon icon={faEnvelope} label={outgoingReqs} color="#F2F2F2" size="3x" />
            </HeaderContainer>
          </Grid>
        </TopContainer>
        <BodyContainer>
          <Grid container spacing={3}>
            <InfoPanel weight={6} label="Days Until Empty" icon={faChartLine} value={daysLeft} />
            <InfoPanel weight={3} label="Daily Consumption" icon={faFire} value={consumption} />
            <InfoPanel weight={3} label="Inventory" icon={faBoxes} value={amount} />
            <InfoPanel weight={6}>
              <DescriptionText variant="body1">{description}</DescriptionText>
            </InfoPanel>
            <InfoPanel weight={6}>
              <DescriptionText>Weekly usage</DescriptionText>
            </InfoPanel>
          </Grid>
        </BodyContainer>
      </MainContainer>
    );
  }, [selectedInventory]);
};

export default InventoryDetails;
