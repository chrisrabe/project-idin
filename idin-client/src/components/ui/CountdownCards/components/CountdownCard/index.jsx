import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainCard = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: -20px 20px 20px rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
  padding: 50px;
  margin-left: 20px;
  margin-right: 20px;
`;

const CardText = styled.h1`
  font-family: Roboto;
  font-weight: 900;
  font-size: 100px;
  text-align: center;
  align-items: center;
  margin: 0px;
`;

const CardLabel = styled.h1`
  margin: 0px;
  font-family: Roboto;
  font-weight: 900;
  font-size: 40px;
  text-align: center;
  align-items: center;
  text-transform: uppercase;
  color: white;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const getText = (value) => {
  if (value < 10) {
    return `0${value}`;
  }
  return `${value}`;
};

const CountdownCard = (props) => {
  const { value, label } = props;
  return (
    <CardContainer>
      <MainCard>
        <CardText>{getText(value)}</CardText>
      </MainCard>
      <CardLabel>{label}</CardLabel>
    </CardContainer>
  );
};

CountdownCard.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default CountdownCard;
