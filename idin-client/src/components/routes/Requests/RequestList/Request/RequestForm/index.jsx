import React, { useCallback, useState } from 'react';
import {
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography, Tooltip,
} from '@material-ui/core';
import { faBoxes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import LabeledIcon from 'components/ui/LabeledIcon';
import styled from 'styled-components';
import { abbreviateNumber } from 'utils/helper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
  const [isPaymentRequired, setIsPaymentRequired] = useState(false);
  const [hasInvalidAmount, setHasInvalidAmount] = useState(false);

  let item = inventory.filter((inv) => inv.itemId === request.itemId);
  item = item.length === 0 ? undefined : item[0];

  const handleConfirm = useCallback(() => {
    if (!hasInvalidAmount) {
      onConfirm(donationAmount, isPaymentRequired);
      onClose();
    }
  }, [
    onConfirm,
    onClose,
    hasInvalidAmount,
    donationAmount,
    isPaymentRequired,
  ]);

  const handleDecline = useCallback(() => {
    onDecline();
    onClose();
  }, [onDecline, onClose]);

  const setAmount = useCallback((amount) => {
    if (item && (amount < item.amount)) {
      setHasInvalidAmount(false);
      setDonationAmount(amount);
    } else {
      setHasInvalidAmount(true);
    }
  }, [setDonationAmount, item, setHasInvalidAmount]);

  return (
    <>
      <DialogContent>
        <HeadingContainer>
          <Tooltip title="Stock in hand" placement="top">
            <div style={{ cursor: 'pointer' }}>
              <LabeledIcon icon={faBoxes} label={(item && abbreviateNumber(item.amount)) || 0} />
            </div>
          </Tooltip>
          <Typography variant="h6">
            {(item && item.name) || 'Unknown Item'}
          </Typography>
        </HeadingContainer>
        <Typography variant="h6">
          Message
        </Typography>
        <Typography variant="body2">
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
          onChange={(e) => setAmount(e.target.value)}
        />
        { hasInvalidAmount
          && (
          <Typography variant="body2" color="secondary">
            Has invalid amount or unknown item
          </Typography>
          )}
        <FormControlLabel
          control={(
            <Checkbox
              color="primary"
              checked={isPaymentRequired}
              onChange={(e) => setIsPaymentRequired(e.target.checked)}
            />
          )}
          label="Require payment?"
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
