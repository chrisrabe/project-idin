import React from 'react';
import {
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Tooltip,
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

const DetailsForm = (props) => {
  const {
    onClose,
    request,
    inventory,
  } = props;

  let item = inventory.filter((inv) => inv.itemId === request.itemId);
  item = item.length === 0 ? undefined : item[0];

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
          Who created this request?
        </Typography>
        <Typography variant="body2">
          IDIN automatically requests other users for supplies if it detects that you will run out.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="default" onClick={onClose}>Close</Button>
      </DialogActions>
    </>
  );
};

DetailsForm.propTypes = {
  request: PropTypes.any.isRequired,
  inventory: PropTypes.any.isRequired,
  onClose: PropTypes.func,
};

export default DetailsForm;
