import React from 'react';
import styled from 'styled-components';
import idinLogo from 'assets/img/idin-logo.png';
import Typography from '@material-ui/core/Typography';

const IDINLogo = styled.img`
  width: 50px;
  height: 50px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 5px solid #56CCF2;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px
`;

const StyledText = styled(Typography)`
  text-transform: uppercase;
  color: white;
  font-size: 20px;
  font-weight: 500;
`;

const NavLogo = () => (
  <LogoContainer>
    <IDINLogo src={idinLogo} />
    <TextContainer>
      <StyledText variant="body1">PROJECT IDIN</StyledText>
    </TextContainer>
  </LogoContainer>
);

export default NavLogo;
