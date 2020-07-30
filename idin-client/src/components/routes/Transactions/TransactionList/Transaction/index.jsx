import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { transStatus, transStatusDisplay } from 'utils/constants';

const Transaction = (props) => {
  const { transaction, orgId } = props;
  const [open, setOpen] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [statuses, setStatuses] = useState([]);

  const getStatuses = useCallback(() => {
    if (transaction.origin === orgId) {
      // interactions when user is from origin
      switch (transaction.status) {
        case transStatus.awaitingPayment:
          return [
            transStatusDisplay[transStatus.canceled],
          ];
        case transStatus.paid:
          return [
            transStatusDisplay[transStatus.pendingDelivery],
            transStatusDisplay[transStatus.inTransit],
          ];
        case transStatus.pendingDelivery:
          return [
            transStatusDisplay[transStatus.inTransit],
          ];
        default:
          return [];
      }
    } else {
      // interaction when user is receiving item
      switch (transaction.status) {
        case transStatus.awaitingPayment:
          return [
            transStatusDisplay[transStatus.paid],
            transStatusDisplay[transStatus.canceled],
          ];
        case transStatus.pendingDelivery:
          return [
            transStatusDisplay[transStatus.canceled],
          ];
        case transStatus.inTransit:
          return [transStatusDisplay[transStatus.completed]];
        default:
          return [];
      }
    }
  }, [transaction, orgId]);

  useEffect(() => {
    // check if they can still update
    setCanEdit(transaction.status !== transStatus.completed
      || transaction.status !== transStatus.canceled);
    // filter status buttons
    setStatuses(getStatuses());
  }, [transaction, setCanEdit, getStatuses]);

  return useMemo(() => {
    return (
      <>
        <TableRow>
          <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)} disabled={statuses.length === 0 || !canEdit}>
              { open ? <KeyboardArrowUp /> : <KeyboardArrowDown /> }
            </IconButton>
          </TableCell>
          <TableCell>{moment(transaction.lastUpdated).format('LLL')}</TableCell>
          <TableCell>{transaction.itemName}</TableCell>
          <TableCell>{transaction.type}</TableCell>
          <TableCell>{transaction.status}</TableCell>
          <TableCell>{transaction.amount}</TableCell>
          <TableCell>{transaction.originCompany}</TableCell>
          <TableCell>{transaction.destCompany}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                {statuses.map((status) => (
                  <Button key={status}>{status}</Button>
                ))}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    )
  }, [transaction, statuses, open, setOpen, canEdit]);
};

Transaction.propTypes = {
  transaction: PropTypes.any.isRequired,
  orgId: PropTypes.string.isRequired,
};

export default Transaction;
