import React, { useState } from 'react';
import {
  TextField, DialogContent, DialogActions, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const UpdateForm = (props) => {
  const { onClose, onSubmit, submitText } = props;
  const [value, setValue] = useState(undefined);
  return (
    <>
      <DialogContent>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          fullWidth
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onSubmit(value)}>{submitText}</Button>
        <Button color="secondary" onClick={onClose}>Cancel</Button>
      </DialogActions>
    </>
  );
};

UpdateForm.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  submitText: PropTypes.string,
};

export default UpdateForm;
