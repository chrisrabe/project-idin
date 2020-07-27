import React from 'react';
import bgImagePath from 'assets/img/bg-image.png';
import cfcLogo from 'assets/img/cfc-logo.svg';
import idinLogo from 'assets/img/idin-logo.png';
import useInterval from 'hooks/useInterval';
import countdown from 'countdown';
import CountdownCards from 'components/ui/CountdownCards';
import {
  MainContainer,
  StyledImage,
  CFCLogo,
  LogoTextWrapper,
  ProjectText,
  IDINLogo,
  DeadlineText,
  KeepCalmText,
} from './styles';

const parseTimeLeft = (timeLeft) => {
  if (timeLeft) {
    const items = timeLeft.split(',').map((item) => item.trim());
    const lastItem = items.pop();
    const lastItems = lastItem.split('and').map((item) => item.trim());
    const values = items.concat(lastItems);
    const timeValues = values.reduce((prev, cur) => {
      const itemValue = cur.split(' ');
      const time = parseInt(itemValue[0], 10);
      const key = itemValue[1].endsWith('s') ? itemValue[1] : `${itemValue[1]}s`;
      return { ...prev, [key]: time };
    }, {});
    const requiredFields = ['days', 'hours', 'minutes', 'seconds'];
    for (const field of requiredFields) {
      if (timeValues[field] === undefined) {
        timeValues[field] = 0;
      }
    }
    return timeValues;
  }
  return {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
};

const App = (props) => {
  const { deadline, timeLeft, homeActions } = props;

  useInterval(() => {
    const duration = countdown(new Date(), new Date(deadline)).toString();
    homeActions.setTimeLeft(duration);
  }, 1000);

  const parsedTime = parseTimeLeft(timeLeft);

  return (
    <MainContainer>
      <StyledImage src={bgImagePath} />
      <CFCLogo src={cfcLogo} />
      <LogoTextWrapper>
        <ProjectText>Project IDiN</ProjectText>
      </LogoTextWrapper>
      <IDINLogo src={idinLogo} />
      <DeadlineText>Project Deadline</DeadlineText>
      <CountdownCards
        days={parsedTime.days}
        hours={parsedTime.hours}
        minutes={parsedTime.minutes}
        seconds={parsedTime.seconds}
      />
      <KeepCalmText>Keep calm and write code</KeepCalmText>
    </MainContainer>
  );
};

export default App;
