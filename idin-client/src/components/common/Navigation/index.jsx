import React from 'react';
import styled from 'styled-components';
import NavLogo from './NavLogo';

const MainContainer = styled.div`
  height: 100vh;
  width: 300px;
  background-color: #333333;
  display: flex;
`;

const Navigation = () => (
  <MainContainer>
    <NavLogo />
  </MainContainer>
);

export default Navigation;
