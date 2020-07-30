import React from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import {
  Grid, List, ListItem, ListItemText,
} from '@material-ui/core';
import architecture from 'assets/img/architecture.png';

const MainContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

const HeaderContainer = styled.div`
  height: 50px;
`;

const StyledText = styled(Typography)`
  color: white;
`;

const StyledImage = styled.img`
  width: 100%;
  border-radius: 20px;
`;

const description = 'IDIN is an inventory distribution network platform '
  + 'that leverages automation to support resource sharing capabilities.'
  + ' IDIN monitors your inventory usage and automatically creates requests'
  + ' to neighbouring hospitals or suppliers when the system predicts that'
  + ' your inventory will be low. This system was designed to address PPE shortages'
  + ' of hospitals all around the world and helps increases the sustainability '
  + 'of medical professionals working in the front-lines of COVID-19.';

const About = () => (
  <MainContainer>
    <HeaderContainer>
      <StyledText variant="h4">About</StyledText>
    </HeaderContainer>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StyledText variant="body2">v1.0.0-alpha</StyledText>
        <StyledText variant="body2">Creator: Chris Rabe (Rabe Studios)</StyledText>
      </Grid>
      <Grid item xs={6}>
        <StyledText variant="h5">
          Description
        </StyledText>
        <StyledText variant="body1">
          {description}
        </StyledText>
        <StyledText variant="h5" style={{ marginTop: 20 }}>
          How it works
        </StyledText>
        <List>
          <ListItem>
            <ListItemText>
              <StyledText>1. React front-end sends and receives data from NodeJS server hosted in IBM cloud</StyledText>
              <StyledText>2. Server stores information on Cloudant database</StyledText>
              <StyledText>3. New or updated items trigger a Cloud function</StyledText>
              <StyledText>4. Cloud function requests server for predictions and raises respective requests</StyledText>
              <StyledText>5. Cloud function forwards email to AWS API Gateway, which triggers an AWS Lambda</StyledText>
              <StyledText>6. AWS Lambda sends emails through AWS SNS</StyledText>
            </ListItemText>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={6}>
        <StyledImage src={architecture} alt="IDIN Architecture" />
      </Grid>
    </Grid>
  </MainContainer>
);

export default About;
