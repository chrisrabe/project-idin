import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import idinLogo from 'assets/img/idin-logo.png';
import Typography from '@material-ui/core/Typography';
import { Grid, IconButton } from '@material-ui/core';
import { Person, Help, PowerSettingsNew } from '@material-ui/icons';

const IDINLogo = styled.img`
  width: 50px;
  height: 50px;
`;

const LogoContainer = styled(Grid)`
  width: 100%;
  border-bottom: 5px solid #56CCF2;
  padding: 20px;
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

const StyledIconButton = styled(({ isSelected, ...rest }) => <IconButton {...rest} />)`
  color: ${(props) => (props.isSelected ? '#56CCF2' : 'white')};
`;

const NavLogo = (props) => {
  const { onSignOut } = props;
  const history = useHistory();
  const { pathname } = useLocation();

  const handleSignOut = useCallback(() => {
    onSignOut();
    history.push('/');
  }, [onSignOut, history]);

  const handleProfile = useCallback(() => {
    history.push('/profile');
  }, [history]);

  return (
    <LogoContainer container direction="row" alignItems="center">
      <Grid item xs={10} container direction="row">
        <IDINLogo src={idinLogo} />
        <TextContainer>
          <StyledText variant="body1">PROJECT IDIN</StyledText>
        </TextContainer>
      </Grid>
      <Grid item container direction="column" xs={2} alignItems="flex-end">
        <Grid item>
          <StyledIconButton
            size="small"
            color="primary"
            isSelected={pathname === '/about'}
          >
            <Help fontSize="small" />
          </StyledIconButton>
        </Grid>
        <Grid item>
          <StyledIconButton
            size="small"
            color="primary"
            onClick={handleProfile}
            isSelected={pathname === '/profile'}
          >
            <Person fontSize="small" />
          </StyledIconButton>
        </Grid>
        <Grid item>
          <IconButton size="small" onClick={handleSignOut}>
            <PowerSettingsNew fontSize="small" color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
    </LogoContainer>
  );
};

NavLogo.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};

export default NavLogo;
