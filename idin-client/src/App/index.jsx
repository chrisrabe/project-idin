import React from 'react';
import bgImagePath from 'assets/img/bg-image.png';
import cfcLogo from 'assets/img/cfc-logo.svg';
import idinLogo from 'assets/img/idin-logo.png';
import {
  MainContainer,
  StyledImage,
  CFCLogo,
  LogoTextWrapper,
  ProjectText,
  IDINLogo,
} from './styles';

const App = (props) => {
  const { deadline } = props;
  console.log(deadline);
  return (
    <MainContainer>
      <StyledImage src={bgImagePath} />
      <CFCLogo src={cfcLogo} />
      <LogoTextWrapper>
        <ProjectText>Project IDiN</ProjectText>
      </LogoTextWrapper>
      <IDINLogo src={idinLogo} />
    </MainContainer>
  );
};

export default App;
