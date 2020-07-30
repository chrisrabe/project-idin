import React, { useCallback } from 'react';
import styled from 'styled-components';
import { List } from '@material-ui/core';
import {
  faBoxes,
  faClipboard,
  faEnvelopeOpen,
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
      <NavLogo onSignOut={handleSignOut} />
      <List component="nav">
        <NavItem route="/inventory" label="Inventory" icon={faBoxes} />
        <NavItem route="/transaction" label="Transactions" icon={faClipboard} />
        <NavItem route="/request" label="Requests" icon={faEnvelopeOpen} />
      </List>
    </MainContainer>
  );
};

export default Navigation;
