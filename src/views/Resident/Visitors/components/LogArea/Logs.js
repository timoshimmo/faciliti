import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  TableSortLabel,
  TablePagination,
  Paper,
} from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#FAFAFA',
    color: '#494949',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: '1px solid #D6D6D6',
    fontSize: 11,
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

const headCells = [
  {
    id: 'registered',
    numeric: false,
    label: 'REGISTERED ON',
  },
  {
    id: 'visitor',
    numeric: false,
    label: 'VISITOR',
  },
  {
    id: 'persons',
    numeric: false,
    label: 'PERSON(S)',
  },
  {
    id: 'due',
    numeric: false,
    label: 'DUE DATE',
  },
  {
    id: 'contact',
    numeric: true,
    label: 'CONTACT',
  },
  {
    id: 'status',
    numeric: true,
    label: 'STATUS',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort } = props;
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
  rowCount: PropTypes.number.isRequired,
};

function createLogs( id, registered, visitor, persons, duedate, contact, status) {
  return { id, registered, visitor, persons, duedate, contact, status };
}

const rows = [
  createLogs( 1, '12/09/2021', 'Yusuf Audu', 1, '12/09/2021', '08099223344', 0),
  createLogs( 2, '12/09/2021', 'Gbola Ahmed', 3, '12/09/2021', '08099223344', 0),
  createLogs( 3, '12/09/2021', 'Cynthia Omoregie', 4, '12/09/2021', '08099223344', 0),
  createLogs( 4, '12/09/2021', 'Obinna Nwosu', 2, '12/09/2021', '08099223344', 2),
  createLogs( 5, '12/09/2021', 'Nyemike Onukwu', 1, '12/09/2021', '08099223344', 1),
  createLogs( 6, '12/09/2021', 'Simi Buba', 3, '12/09/2021', '08099223344', 2),
  createLogs( 7, '12/09/2021', 'Tobi Musa', 2, '12/09/2021', '08099223344', 2),
  createLogs( 8, '12/09/2021', 'Tokmang Wang', 1, '12/09/2021', '08099223344', 2),
  createLogs( 9, '12/09/2021', 'Afam Ojemeni', 2, '12/09/2021', '08099223344', 1),
  createLogs( 10, '12/09/2021', 'Akugbe Otakpowehin', 5, '12/09/2021', '08099223344', 1),
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

const Logs = props => {

  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  return (
    <Paper style={{ width: '100%' }}>
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>REGISTERED ON</StyledTableCell>
              <StyledTableCell>VISITOR</StyledTableCell>
              <StyledTableCell align="center">PERSONS</StyledTableCell>
              <StyledTableCell>DUE DATE</StyledTableCell>
              <StyledTableCell align="center">CONTACT</StyledTableCell>
              <StyledTableCell align="center">STATUS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.registered}
                  </StyledTableCell>
                  <StyledTableCell style={{ maxWidth: 100, whiteSpace: 'nowrap' }}>
                    <Box
                       component="div"
                       my={2}
                       textOverflow="ellipsis"
                       overflow="hidden"
                       bgcolor="#ffffff"
                     >
                       {row.visitor}
                     </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                       {row.persons}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.duedate}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ maxWidth: 80, whiteSpace: 'nowrap' }}>
                  <Box
                     component="div"
                     my={1}
                     textOverflow="ellipsis"
                     overflow="hidden"
                     bgcolor="#ffffff"
                   >
                      {row.contact}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.status === 0 ? 'Pending' : row.status === 1 ? 'Checked-in' : 'Expired' }
                  </StyledTableCell>
                </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
         rowsPerPageOptions={[5, 10, 25]}
         component="div"
         count={rows.length}
         rowsPerPage={rowsPerPage}
         page={page}
         onPageChange={handleChangePage}
         onRowsPerPageChange={handleChangeRowsPerPage}
       />
   </Paper>
  );
}

export default Logs;
