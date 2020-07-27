import styled from 'styled-components';

export const StyledImage = styled.img`
  position: absolute;
  width: 100%;
  object-fit: scale;
`;

export const CFCLogo = styled.img`
  position: absolute;
  top: 80%;
  left: 85%;
`;

export const IDINLogo = styled.img`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 150px;
  height: 150px;
`;

export const MainContainer = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: black;
`;

export const LogoTextWrapper = styled.div`
  position: absolute;
  top: 8%;
  left: 14%;
`;

export const ProjectText = styled.h1`
  color: white;
  text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
  font-size: 40px;
  font-family: Roboto;
  margin: 0;
`;

export const DeadlineText = styled.h1`
  color: white;
  font-size: 60px;
  position: absolute;
  font-weight: 500
  text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
  margin: 0px;
  top: 20%;
  left: 40%;
  text-transform: uppercase;
`;

export const KeepCalmText = styled.p`
  font-family: Roboto;
  color: #56CCF2;
  font-size: 40px;
  position: absolute;
  font-weight: 200
  text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
  margin: 0px;
  top: 65%;
  left: 40%;
  text-transform: uppercase;
`;
