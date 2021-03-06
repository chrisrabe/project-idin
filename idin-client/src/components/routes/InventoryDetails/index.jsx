import React, { useCallback, useEffect, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Grid, Tooltip } from '@material-ui/core';
import LabeledIcon from 'components/ui/LabeledIcon';
import {
  faShippingFast, faBoxes, faCalendar, faFire, faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { ArrowBack } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { Bar } from 'react-chartjs-2';
import { abbreviateNumber } from 'utils/helper';
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

  const getChartData = useCallback((usage) => {
    if (usage) {
      const labels = Object.keys(usage);
      const data = Object.keys(usage).map((key) => usage[key]);
      return {
        labels,
        datasets: [
          {
            label: 'Inventory',
            backgroundColor: '#56CCF2',
            data,
          },
        ],
      };
    }
    return undefined;
  }, []);

  return useMemo(() => {
    const {
      name,
      inTransit,
      amount,
      description,
      consumption,
      daysLeft,
      outgoingReqs,
      weeklyUsage,
    } = selectedInventory || {};

    const hasValidDaysLeft = daysLeft !== undefined && daysLeft !== '∞' && !Number.isNaN(daysLeft);

    const title = name || 'Inventory Details';
    const inTransitText = inTransit || 0;
    const amountText = amount ? abbreviateNumber(amount) : 0;
    const descText = description || 'No description';
    const burnRate = consumption ? Math.round(consumption) : '0';
    const daysLeftText = hasValidDaysLeft ? Math.round(daysLeft) : '∞';
    const outgoing = outgoingReqs || 0;
    const chartData = getChartData(weeklyUsage);

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
              <Tooltip title="Incoming delivery">
                <div style={{ cursor: 'pointer' }}>
                  <LabeledIcon icon={faShippingFast} label={inTransitText} color="#F2F2F2" size="3x" />
                </div>
              </Tooltip>
              <Tooltip title="Outgoing delivery">
                <div style={{ cursor: 'pointer' }}>
                  <LabeledIcon icon={faEnvelope} label={outgoing} color="#F2F2F2" size="3x" />
                </div>
              </Tooltip>
            </HeaderContainer>
          </Grid>
        </TopContainer>
        <BodyContainer>
          <Grid container spacing={3}>
            <InfoPanel weight={6} label="Days Until Empty" icon={faCalendar} value={daysLeftText} />
            <InfoPanel weight={3} label="Daily Consumption" icon={faFire} value={burnRate} />
            <InfoPanel weight={3} label="Inventory" icon={faBoxes} value={amountText} />
            <InfoPanel weight={6}>
              <DescriptionText variant="body1">{descText}</DescriptionText>
            </InfoPanel>
            <InfoPanel weight={6}>
              <div style={{ padding: 20, width: '100%', height: '100%' }}>
                {chartData ? (
                  <Bar
                    data={chartData}
                    width={20}
                    height={20}
                    options={{
                      maintainAspectRatio: false,
                      title: {
                        display: true,
                        text: 'Weekly usage',
                      },
                    }}
                  />
                )
                  : <DescriptionText variant="body1">No data</DescriptionText>}
              </div>
            </InfoPanel>
          </Grid>
        </BodyContainer>
      </MainContainer>
    );
  }, [selectedInventory, goBack, getChartData]);
};

export default InventoryDetails;
