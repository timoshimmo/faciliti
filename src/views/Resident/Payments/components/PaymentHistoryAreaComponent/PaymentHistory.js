import React from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#FAFAFA',
    color: '#494949',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: '1px solid #D6D6D6',
    fontSize: 12,
  },
  body: {
    fontSize: 12,
    color: '#696F79',
    paddingTop: 0,
    paddingBottom: 0,
    borderBottom: '1px solid #D6D6D6',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
      backgroundColor: "#FFFFFF",
  },
}))(TableRow);

function createPaymentHistory( id, date, amount, description, status, method) {
  return { id, date, amount, description, status, method };
}

const rows = [
  createPaymentHistory( 1, '12/09/2021', 1500.50, 'Security & Guard Wages', 0, 'VISA*****3849'),
  createPaymentHistory( 2, '12/09/2021', 270.00, 'Drainage Mgt & Repairs', 1, 'GTBank Transafer'),
  createPaymentHistory( 3, '12/09/2021', 20.50, 'Change Street Lighting Bulbs', 1, 'VERVE*****5588'),
  createPaymentHistory( 4, '12/09/2021', 35.80, 'Clean Water Tanker', 1, 'USSD Code'),
  createPaymentHistory( 5, '12/09/2021', 500.00, 'Monthly Gas Payment For Power', 1, 'MASTER*****9901'),
  createPaymentHistory( 6, '12/09/2021', 80.00, 'Planting New Trees', 0, 'Ecobank Transfer'),
];

const useStyles = makeStyles(theme => ({

  table: {
    maxWidth: '100%',
  },
  failedStyles: {
    color: theme.palette.priority.red,
    borderColor: theme.palette.priority.red
  },
  failedLabelStyle: {
    color: theme.palette.priority.red,
    fontSize: 11
  },
  successfulStyles: {
    color: theme.palette.priority.blue,
    borderColor: theme.palette.priority.blue
  },
  successfulLabelStyle: {
    color: theme.palette.priority.blue,
    fontSize: 11
  },

}));

const PaymentHistory = props => {

  const classes = useStyles();

  return (
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>DATE</StyledTableCell>
              <StyledTableCell align="center">AMOUNT</StyledTableCell>
              <StyledTableCell>DESCRIPTION</StyledTableCell>
              <StyledTableCell align="center">STATUS</StyledTableCell>
              <StyledTableCell align="center">PAYMENT METHOD</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.date}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    ${row.amount}
                  </StyledTableCell>
                  <StyledTableCell style={{ maxWidth: 150, whiteSpace: 'nowrap' }}>
                    <Box
                       component="div"
                       my={2}
                       textOverflow="ellipsis"
                       overflow="hidden"
                       bgcolor="#ffffff"
                     >
                       {row.description}
                     </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.status === 0 ?
                      <Chip
                        label="Failed"
                        variant="outlined"
                        size="small"
                        classes={{ root: classes.failedStyles, label: classes.failedLabelStyle }}
                      />
                      :
                      <Chip
                        label="Successful"
                        variant="outlined"
                        size="small"
                        classes={{ root: classes.successfulStyles, label: classes.successfulLabelStyle }}
                      />
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ maxWidth: 90, whiteSpace: 'nowrap' }}>
                  <Box
                     component="div"
                     my={1}
                     textOverflow="ellipsis"
                     overflow="hidden"
                     bgcolor="#ffffff"
                   >
                      {row.method}
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default PaymentHistory;
