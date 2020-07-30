import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Transaction
  from 'components/routes/Transactions/TransactionList/Transaction';
import moment from 'moment';

const MainContainer = styled(Paper)`
  width: 100%;
`;

const StyledContainer = styled(TableContainer)`
  min-height: 500px;
  max-height: 700px;
`;

const columns = [
  'Last updated',
  'Item',
  'Type',
  'Status',
  'Amount',
  'Origin',
  'Destination',
];

const TransactionList = (props) => {
  const { transactions, orgId } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, [setPage]);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  }, [setRowsPerPage, setPage]);

  return useMemo(() => {
    const sortedTrans = transactions.sort((a, b) => {
      const aUpdated = moment(a.lastUpdated);
      const bUpdated = moment(b.lastUpdated);
      return aUpdated.diff(bUpdated) * -1;
    });
    return (
      <MainContainer>
        <StyledContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell />
                {columns.map((col) => (
                  <TableCell key={col}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTrans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((trans) => (
                  <Transaction key={trans.id} transaction={trans} orgId={orgId} />
                ))}
            </TableBody>
          </Table>
        </StyledContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          rowsPerPage={rowsPerPage}
          count={transactions ? transactions.length : 0}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </MainContainer>
    );
  }, [
    handleChangeRowsPerPage,
    handleChangePage,
    orgId,
    page,
    rowsPerPage,
    transactions
  ]);
};

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  orgId: PropTypes.string.isRequired,
};

export default TransactionList;
