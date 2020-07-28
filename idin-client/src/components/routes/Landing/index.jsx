import React from 'react';
import bgImage from 'assets/img/bg-image.png';
import cfcImage from 'assets/img/cfc-logo.svg';
import idinLogo from 'assets/img/idin-logo.png';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import AuthForm from 'components/routes/Landing/AuthForm';
import {
  StyledImage,
} from './styles';

const MainContainer = styled.div`
  display: flex;
`;

const BodyContainer = styled(Grid)`
  position: absolute;
  height: 100%;
  padding: 20px;
`;

const FormContainer = styled(Grid)`
  padding-top: 5%;
  padding-right: 10%;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const IDINLogo = styled.img`
  width: 200px;
  height: 200px;
`;

const ParagraphContainer = styled.div`
  background-color: #333333;
  border-radius: 20px;
  padding: 20px;
  width: 500px;
`;

const BigText = styled(Typography)`
  color: white;
  font-size: 40px;
  text-align: center;
`;

const AppTitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const AppTitleText = styled(Typography)`
  font-size: 60px;
  color: white;
  font-weight: 500;
`;

const AppDetailsContainer = styled(Grid)`
  padding-left: 5%;
`;

const Landing = () => (
  <MainContainer>
    <StyledImage src={bgImage} />
    <BodyContainer container spacing={1}>
      <Grid container item xs={12} direction="row">
        <AppDetailsContainer item container xs={6} alignItems="center">
          <LogoContainer>
            <IDINLogo src={idinLogo} />
            <AppTitleContainer>
              <AppTitleText variant="body1">PROJECT IDIN</AppTitleText>
            </AppTitleContainer>
          </LogoContainer>
          <ParagraphContainer>
            <BigText>Stay on top of your inventory through our predictive analysis</BigText>
          </ParagraphContainer>
        </AppDetailsContainer>
        <FormContainer item container xs={6} alignContent="center" justify="flex-end">
          <AuthForm />
        </FormContainer>
      </Grid>
      <Grid container item xs={12} alignItems="flex-end">
        <img src={cfcImage} alt="Call For Code Logo" />
      </Grid>
    </BodyContainer>
  </MainContainer>
);

export default Landing;
