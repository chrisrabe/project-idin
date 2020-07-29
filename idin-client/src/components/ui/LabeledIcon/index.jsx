import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const MainContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: 'center';
  justify-content: 'center';
`;

const StyledIcon = styled(({ color, ...rest }) => <FontAwesomeIcon {...rest} />)`
  color: ${(props) => (props.color ? props.color : '#333333')};
`;

const IconLabel = styled(Typography)`
  margin-left: 10px;
`;

const LabeledIcon = (props) => {
  const { icon, label, color } = props;
  return (
    <MainContainer>
      <StyledIcon icon={icon} color={color} size="lg" />
      <IconLabel>{label}</IconLabel>
    </MainContainer>
  );
};

LabeledIcon.propTypes = {
  icon: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
  color: PropTypes.string,
};

export default LabeledIcon;
