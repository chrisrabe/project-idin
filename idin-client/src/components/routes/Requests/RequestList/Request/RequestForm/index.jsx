import React, { useCallback, useState } from 'react';
import {
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import { faBoxes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import LabeledIcon from 'components/ui/LabeledIcon';
import styled from 'styled-components';
import { abbreviateNumber } from 'utils/helper';

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RequestForm = (props) => {
  const {
    onClose,
    onConfirm,
    onDecline,
    request,
    inventory,
  } = props;

  const [donationAmount, setDonationAmount] = useState(0);

  let item = inventory.filter((inv) => inv.itemId === request.itemId);
  item = item.length === 0 ? undefined : item[0];

  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  const handleDecline = useCallback(() => {
    onDecline();
    onClose();
  }, [onDecline, onClose]);

  return (
    <>
      <DialogContent>
        <HeadingContainer>
          <LabeledIcon icon={faBoxes} label={(item && abbreviateNumber(item.amount)) || 0} />
          <Typography variant="h6">
            {(item && item.name) || 'Unknown Item'}
          </Typography>
        </HeadingContainer>
        <Typography variant="h6">
          Message
        </Typography>
        <Typography variant="body1">
          {request.message}
        </Typography>
        <Typography variant="h6">
          Donate?
        </Typography>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          fullWidth
          onChange={(e) => setDonationAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleConfirm}>Confirm</Button>
        <Button color="secondary" onClick={handleDecline}>Decline</Button>
        <Button color="default" onClick={onClose}>Cancel</Button>
      </DialogActions>
    </>
  );
};

RequestForm.propTypes = {
  request: PropTypes.any.isRequired,
  inventory: PropTypes.any.isRequired,
  onConfirm: PropTypes.func,
  onDecline: PropTypes.func,
  onClose: PropTypes.func,
};

export default RequestForm;
