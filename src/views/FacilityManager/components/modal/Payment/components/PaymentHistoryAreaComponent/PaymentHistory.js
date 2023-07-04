import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/styles';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableSortLabel,
  TableHead,
  TableRow,
  Box,
  Chip,
} from '@material-ui/core';
import AXIOS from '../../../../../../../util/webservices';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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

const headCells = [
  {
    id: 'paymentDate',
    numeric: false,
    label: 'DATE',
  },
  {
    id: 'amount',
    numeric: false,
    label: 'AMOUNT',
  },
  {
    id: 'description',
    numeric: false,
    label: 'DESCIPTION',
  },
  {
    id: 'paymentMethod',
    numeric: false,
    label: 'PAYMENT METHOD',
  }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span style={{
                    border: 0,
                    clip: 'rect(0 0 0 0)',
                    height: 1,
                    margin: -1,
                    overflow: 'hidden',
                    padding: 0,
                    position: 'absolute',
                    top: 20,
                    width: 1,
                }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

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

/*

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
*/

const PaymentHistory = props => {

  const classes = useStyles();

  const { contract } = props;

  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    handleGetPayments();
 }, []);

 //`contracts/${contractId}/charges/${chargeId}/payments?index=0&range=100`

  const handleGetPayments = () => {

    if(!loading) {

      setLoading(true);

      //console.log("POP-UP CONTRACTS PAYMENT: ", contractId);
      //console.log("POP-UP CHARGES PAYMENT: ", charges);

      let serviceContractId = '';
      let serviceChargeId = '';

      //console.log("CONTRACT DATA: ", typeof contract);

      if(contract !== undefined || typeof contract !== 'undefined') {

        if(Object.keys(contract).length > 0) {
          serviceContractId = contract.key.uuid;
          serviceChargeId = contract.chargeData[0].key.uuid;
        }

          //serviceChargeId = charges[0].key.uuid;

          AXIOS.get(`contracts/${serviceContractId}/charges/${serviceChargeId}/payments?index=0&range=100`)
        .then(response => {
            const res = response.data;
          //  console.log("ALL PAYMENTS:" + JSON.stringify(res));
            setPayments(res.response);
            setLoading(false);
            //setServices(res.response);
        })
        .catch(function (error) {
            setLoading(false);
            console.log(error.response);
            console.log(error.message);
        })

      }

    }

  }

  const handleRequestSort = (event, property) => {
   const isAsc = orderBy === property && order === 'asc';
   setOrder(isAsc ? 'desc' : 'asc');
   setOrderBy(property);
 };

 const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value));
   setPage(0);
 };

 const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payments.length) : 0;

  return (
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}/>
          <TableBody>
            {stableSort(payments, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {moment(row.createdAt).format('DD/MM/YYYY')}
                      {row.date}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <CurrencyFormat value={row.amount} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                    </StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 150, whiteSpace: 'nowrap' }}>
                      <Box
                         component="div"
                         my={2}
                         textOverflow="ellipsis"
                         overflow="hidden"
                         bgcolor="#ffffff"
                       >
                         {row.reference}
                       </Box>
                    </StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 150, whiteSpace: 'nowrap' }}>
                      {row.patmentMethod === 0 ?
                        <Box
                           component="div"
                           my={2}
                           textOverflow="ellipsis"
                           overflow="hidden"
                           bgcolor="#ffffff"
                         >
                           Offline
                         </Box>
                        :
                        <Box
                           component="div"
                           my={2}
                           textOverflow="ellipsis"
                           overflow="hidden"
                           bgcolor="#ffffff"
                         >
                           Online
                         </Box>
                      }
                    </StyledTableCell>
                  </StyledTableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <StyledTableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default PaymentHistory;
