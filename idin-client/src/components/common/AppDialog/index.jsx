import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle,
} from '@material-ui/core';

const AppDialog = (props) => {
  const {
    isOpen, handleClose, title, body,
  } = props;
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      {body}
    </Dialog>
  );
};

AppDialog.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  body: PropTypes.any,
};

export default AppDialog;
