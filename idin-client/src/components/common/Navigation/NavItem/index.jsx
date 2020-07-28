import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ListItem, ListItemText, Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavText = styled(({ isSelected, ...rest }) => <ListItemText {...rest} />)`
  color: ${(props) => (props.isSelected ? '#56CCF2' : '#F2F2F2')};
`;

const StyledIcon = styled(({ isSelected, ...rest }) => <FontAwesomeIcon {...rest} />)`
  color: ${(props) => (props.isSelected ? '#56CCF2' : '#F2F2F2')};
`;

const NavItem = (props) => {
  const {
    route, label, icon, onClick,
  } = props;
  const { pathname } = useLocation();
  const history = useHistory();
  const isSelected = pathname === route;

  const handleClick = useCallback(() => {
    if (!onClick) {
      history.push(route);
    } else {
      onClick();
      history.push(route);
    }
  }, [onClick, route, history]);

  return (
    <ListItem button onClick={handleClick}>
      <Grid container>
        <Grid container item xs={2} alignItems="center" justify="center">
          <StyledIcon size="lg" icon={icon} isSelected={isSelected} />
        </Grid>
        <Grid item xs={10}>
          <NavText primary={label} isSelected={isSelected} />
        </Grid>
      </Grid>
    </ListItem>
  );
};

NavItem.propTypes = {
  route: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  onClick: PropTypes.func,
};

export default NavItem;
