import React from 'react';
import bgImage from 'assets/img/bg-image.png';
import idinLogo from 'assets/img/idin-logo.png';
import { StyledImage } from 'components/routes/Landing/styles';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { GitHub, YouTube } from '@material-ui/icons';
import TooltipIconButton from 'components/common/TooltipIconButton';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BodyContainer = styled.div`
  position: absolute;
  padding: 5%;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const AppTitleText = styled(Typography)`
  font-size: 60px;
  color: white;
  font-weight: 500;
`;

const InfoContainer = styled.div`
  background-color: #333333;
  height: 200px;
  width: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  justify-content: center;
`;

const StyledButton = styled(TooltipIconButton)`
  color: white;
`;

const InfoText = styled(Typography)`
  color: #56CCF2;
  font-size: 30px;
  font-weight: 300;
  font-family: Roboto;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Unavailable = () => (
  <MainContainer>
    <StyledImage src={bgImage} />
    <BodyContainer style={{ position: 'absolute' }}>
      <img style={{ width: 250, height: 250 }} src={idinLogo} alt="IDIN Logo" />
      <AppTitleText variant="body1">PROJECT IDIN</AppTitleText>
      <InfoContainer>
        <InfoText variant="body1">Demo site is no longer available</InfoText>
        <ButtonContainer>
          <StyledButton
            tooltipText="Set it up locally or contribute"
            onClick={() => window.open('https://github.com/chrisrabe/project-idin', '_blank')}
          >
            <GitHub fontSize="large" />
          </StyledButton>
          <StyledButton
            tooltipText="Learn more"
            onClick={() => window.open('https://www.youtube.com/watch?v=CJchKYX8Pzw', '_blank')}
          >
            <YouTube fontSize="large" />
          </StyledButton>
        </ButtonContainer>
      </InfoContainer>
    </BodyContainer>
  </MainContainer>
);

export default Unavailable;
