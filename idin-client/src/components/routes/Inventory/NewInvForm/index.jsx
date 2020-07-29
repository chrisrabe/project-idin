import React, { useCallback, useState } from 'react';
import {
  TextField, DialogContent, DialogActions, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';

const NewInvForm = (props) => {
  const { onClose, onSubmit, items } = props;
  const [amount, setAmount] = useState(0);
  const [item, setItem] = useState(undefined);

  const handleSubmit = useCallback(() => {
    if (amount && item) {
      onSubmit({
        itemId: item.id,
        amount,
      });
      onClose();
    }
  }, [onSubmit, onClose, amount, item]);

  return (
    <>
      <DialogContent>
        <Autocomplete
          getOptionLabel={(option) => option.itemName}
          onChange={(e, value) => setItem(value)}
          renderInput={(params) => <TextField {...params} label="Item" variant="outlined" margin="normal" />}
          options={items}
        />
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          fullWidth
          onChange={(e) => setAmount(parseInt(e.target.value, 10))}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleSubmit}>CREATE</Button>
        <Button color="secondary" onClick={onClose}>Cancel</Button>
      </DialogActions>
    </>
  );
};

NewInvForm.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  items: PropTypes.array,
};

export default NewInvForm;
