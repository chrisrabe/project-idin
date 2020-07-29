import React, { useCallback } from 'react';
import styled from 'styled-components';
import { List } from '@material-ui/core';
import {
  faBoxes, faClipboard, faEnvelopeOpen, faUser, faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import NavLogo from './NavLogo';
import NavItem from './NavItem';

const MainContainer = styled.div`
  height: 100vh;
  min-width: 300px;
  background-color: #333333;
  display: flex;
  flex-direction: column;
`;

const Navigation = (props) => {
  const { homeActions } = props;

  const handleSignOut = useCallback(() => {
    homeActions.signOut();
  }, [homeActions]);

  return (
    <MainContainer>
      <NavLogo />
      <List component="nav">
        <NavItem route="/inventory" label="Inventory" icon={faBoxes} />
        <NavItem route="/transaction" label="Transactions" icon={faClipboard} />
        <NavItem route="/request" label="Requests" icon={faEnvelopeOpen} />
        <NavItem route="/profile" label="Profile" icon={faUser} />
        <NavItem route="/" label="Sign out" icon={faPowerOff} onClick={handleSignOut} />
      </List>
    </MainContainer>
  );
};

export default Navigation;
