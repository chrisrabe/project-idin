import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CountdownCard from './components/CountdownCard';

const MainContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 25%;
  display: flex;
`;

const CountdownCards = (props) => {
  const {
    days, hours, minutes, seconds,
  } = props;
  return (
    <MainContainer>
      <CountdownCard value={days} label="Days" />
      <CountdownCard value={hours} label="Hrs" />
      <CountdownCard value={minutes} label="Mins" />
      <CountdownCard value={seconds} label="Secs" />
    </MainContainer>
  );
};

CountdownCards.propTypes = {
  days: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default CountdownCards;
