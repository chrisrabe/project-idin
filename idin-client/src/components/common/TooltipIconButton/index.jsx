import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-ui/core';

const TooltipIconButton = (props) => {
  const {
    tooltipText, children, onClick, ...rest
  } = props;
  return (
    <Tooltip title={tooltipText}>
      <IconButton onClick={onClick} {...rest}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

TooltipIconButton.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default TooltipIconButton;
