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

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconLabel = styled(({ color, ...rest }) => <Typography {...rest} />)`
  margin-left: 20px;
  color: ${(props) => (props.color ? props.color : '#333333')};
  ${(props) => (props.size !== 'lg' ? 'font-size: 25px;' : '')}
`;

const LabeledIcon = (props) => {
  const {
    icon, label, color, size,
  } = props;
  return (
    <MainContainer>
      <StyledIcon icon={icon} color={color} size={size || 'lg'} />
      <LabelContainer>
        <IconLabel color={color} size={size || 'lg'}>{label}</IconLabel>
      </LabelContainer>
    </MainContainer>
  );
};

LabeledIcon.propTypes = {
  icon: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
};

export default LabeledIcon;
