import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableSortLabel,
  Toolbar,
  Grid,
  Typography,
  TableHead,
  Paper,
  TableRow,
  Box,
} from '@material-ui/core';
import AXIOS from '../../../util/webservices';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import { useLocation } from "react-router-dom";

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

const EnhancedTableToolbar = (props) => {

  const toolbarStyles = makeStyles(theme => ({
    filterMenuButton: {
      fontSize: 12,
      textTransform: 'none',
      maxHeight: 40,
      color: "#FFFFFF",
      padding: '10px 15px',
      backgroundColor: '#1B75BC',
      fontFamily: [
        'Open Sans',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      "&:hover": {
        backgroundColor: '#1a5faf',
      },
    },
    dropdown: {
      transition: theme.transitions.create(["transform"], {
        duration: theme.transitions.duration.short
      })
    },
    dropdownOpen: {
      transform: "rotate(-180deg)"
    },
    dropdownClosed: {
      transform: "rotate(0)"
    },
    filterCancelButton: {
      textTransform: 'none',
      fontSize: 12,
      fontWeight: 400,
      marginTop: 5,
      maxHeight: 35,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      "&:hover": {
        backgroundColor: 'transparent',
      },
    },
    buttonStyle: {
      fontSize: 12,
      textTransform: 'none',
      marginTop: 5,
      maxHeight: 35,
      color: "#FFFFFF",
      backgroundColor: '#1B75BC',
      fontFamily: [
        'Open Sans',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      "&:hover": {
        backgroundColor: '#1a5faf',
      },
    },
    frmControlLabelStyleRoot: {
      width: '100%',
      marginLeft: 0,
      marginRight: 0,
      paddingRight: 7
    },
    frmControlLabelStyleLabel: {
      fontSize: 13,
      fontWeight: 400,
      fontFamily: [
        'Open Sans',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      position: 'absolute',
      left: 20
    },
    checkroot: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    checkIcon: {
      borderRadius: 3,
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(161, 169, 179,.5)',
        backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      },
    },
    checkedIcon: {
      backgroundColor: '#2688FB',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#137cbd',
      },
    },
    gridItemStyles: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    toolbar: {
      padding: 20,
    },
    titleArea: {
      paddingLeft: 15,
      display: 'flex'
    },
    exportLinkStyle: {
      textTransform: 'none',
      fontSize: 13,
      color: '#8692A6',
      fontWeight: 400,
      padding: '7px 25px',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      border: '1px #8692A6 solid',
      "&:hover": {
        backgroundColor: 'transparent',
      },
    },
    plainButtonStyle: {
      textTransform: 'none',
      fontSize: 13,
      color: '#8692A6',
      fontWeight: 400,
      padding: 0,
      marginLeft: 15,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      "&:hover": {
        backgroundColor: 'transparent',
      },
    },

  }));

    //const { onOpenMenu, onHandleMenuClose, anchorEl, checkid, onMenuClick, checkState, onHandleCheckChange, onHandleFilter, onHandleSearch } = props;
    const styles = toolbarStyles();

    return (
      <Toolbar className={styles.toolbar}>
        <Grid container alignItems='center'>
          <Grid
          item
          lg={12}
          className={styles.titleArea}>
          <Typography
              variant="h4"
              gutterBottom
              style={{
                fontSize: 18,
                color: '#494949',
                fontWeight: 600,
              }}
            >
              Payments List
            </Typography>
          
          </Grid>
        </Grid>
      </Toolbar>
    );
  };



const useStyles = makeStyles(theme => ({

  
  root: {
    marginTop: 40,
    paddingBottom: 40,
    paddingRight: 40,
    paddingLeft: 40,
  },

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
  paperBody: {
    marginTop: 20,

  },

}));

const PaymentHistory = props => {

  const classes = useStyles();
  const location = useLocation();

  //const { contractId, chargeId } = ;

  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [services, setServices] = useState([]);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    handleGetPayments();
 }, []);

 //`contracts/${contractId}/charges/${chargeId}/payments?index=0&range=100`

 console.log("CONTRACT ID: ", location.state.contractId);
 console.log("CHARGE ID: ", location.state.chargeId);

  const handleGetPayments = () => {

    if(!loading) {

      setLoading(true);

      let contractId = location.state.contractId;
      let chargeId = location.state.chargeId;

      //console.log("CONTRACT DATA: ", typeof contract);

      if(contractId !== undefined || typeof contractId !== 'undefined') {

        /*  if(Object.keys(contract).length > 0) {
            contractId = contract.key.uuid;
            chargeId = contract.chargeData[0].key.uuid;
          } */

          //AXIOS.get(`contracts/9EQU4GSOQHOTO0R8O8C0ULROJ/charges/RSCCJ0YIRYBJG0R8O8C0ULROJ/payments?index=0&range=100`)

          AXIOS.get(`contracts/${contractId}/charges/${chargeId}/payments?index=0&range=100`)
          .then(response => {
              const res = response.data;
              console.log("ALL PAYMENTS:" + JSON.stringify(res));
              setPayments(res.response);
              setLoading(false);
              //setServices(res.response);
          })
          .catch(function (error) {
              setLoading(false);
              console.log(error);
              //console.log(error.message);
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
    <div className={classes.root}>
      <Paper style={{ width: '100%' }}>
      <div className={classes.paperBody}>
        <EnhancedTableToolbar />
        <div>
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
        </div>
      </div>
      </Paper>
    </div>
  );
}

export default PaymentHistory;
