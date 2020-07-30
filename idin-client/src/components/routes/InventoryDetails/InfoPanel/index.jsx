import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PanelContainer = styled(Paper)`
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ValueText = styled(Typography)`
  font-weight: 500;
  font-size: 7rem;
`;

const LabelText = styled(Typography)`
  font-size: 40;
  font-weight: 300;
  line-space: 3px;
  text-transform: uppercase;
`;

const InfoPanel = (props) => {
  const {
    weight, label, icon, children, value,
  } = props;
  const content = children || (
    <>
      <FontAwesomeIcon icon={icon} size="5x" />
      <ValueText variant="h1">{value}</ValueText>
      <LabelText variant="body1">{label}</LabelText>
    </>
  );
  return (
    <Grid item xs={weight}>
      <PanelContainer>
        { content }
      </PanelContainer>
    </Grid>
  );
};

InfoPanel.propTypes = {
  weight: PropTypes.number.isRequired,
  label: PropTypes.string,
  icon: PropTypes.any,
  value: PropTypes.any,
};

export default InfoPanel;
