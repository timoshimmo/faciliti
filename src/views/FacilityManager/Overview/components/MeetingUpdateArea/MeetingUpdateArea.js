import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableSortLabel,
  TablePagination,
  TableHead,
  TableRow,
  Box
} from '@material-ui/core';
import PropTypes from 'prop-types';
import AXIOS from '../../../../../util/webservices';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    paddingTop: 10,
    paddingBottom: 10,
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
    id: 'due',
    numeric: false,
    label: 'DATE',
  },
  {
    id: 'event',
    numeric: false,
    label: 'EVENT',
  },
  {
    id: 'attendees',
    numeric: false,
    label: 'ATTENDEES',
  },
  {
    id: 'priority',
    numeric: true,
    label: 'PRIORITY',
  },
  {
    id: 'status',
    numeric: true,
    label: 'STATUS',
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
              direction={orderBy === headCell.id ? order : 'desc'}
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

function createMeetingUpdate(date, event, assignee, priority, contact, status) {
  return { date, event, assignee, priority, contact, status };
}


const useStyles = makeStyles(theme => ({

  table: {
    maxWidth: '100%',
  },
  highStyles: {
    color: theme.palette.priority.red,
    borderColor: theme.palette.priority.red,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    fontSize: 11
  },
  mediumStyles: {
    color: theme.palette.priority.blue,
    borderColor: theme.palette.priority.blue,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    fontSize: 11
  },
  lowStyles: {
    color: theme.palette.priority.green,
    borderColor: theme.palette.priority.green,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    fontSize: 11
  },
  buttonProgress: {
     color: theme.palette.primary.main,
     position: 'absolute',
     top: '90%',
     left: '55%',
     transform: 'translateX(-50%)',
   },

   tableBody: {
      display: 'relative',
   },

   mainBody: {
    display: 'relative',
    minHeight: 100
   }

}));

const MeetingUpdateArea = props => {

  const classes = useStyles();

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('due');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [meetings, setMeetings] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
   const isAsc = orderBy === property && order === 'asc';
   setOrder(isAsc ? 'desc' : 'asc');
   setOrderBy(property);
 };
//  className={row.priority === 0 ? classes.highStyles : row.priority === 1 ? classes.mediumStyles : classes.lowStyles}
  useEffect(() => {
    handleGetAll();
 }, []);

  const handleGetAll = () => {

      if(!loading) {

        setLoading(true);

        /*const obj = {
          segmentName : "INJREAM26606",
          userId : userData.crxDetails.userId,
          index : 0,
          range : 10
        };*/

        AXIOS.get('meetings/?index=0&range=5')
          .then(response => {
            setLoading(false);
            const res = response.data.response;
          //  console.log("ALL MEETINGS:" + JSON.stringify(res));
            setMeetings(res);
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error.response);
            console.log(error.message);
          })
      }


  }

  const emptyRows =
   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - meetings.length) : 0;

  return (
    <div className="mainBody">
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={meetings.length}/>
          <TableBody className="tableBody">
            {loading ?
              (<CircularProgress size={25} className={classes.buttonProgress} />)
              :
              (
                stableSort(meetings, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {

                      return (
                        <StyledTableRow key={row.key.uuid}>
                          <StyledTableCell component="th" scope="row">
                            {moment(row.date).format('DD/MM/YYYY hh:mm:ss A')}
                          </StyledTableCell>
                          <StyledTableCell style={{ maxWidth: 150, whiteSpace: 'nowrap' }}>
                            <Box
                               component="div"
                               my={1}
                               textOverflow="ellipsis"
                               overflow="hidden"
                               bgcolor="transparent"
                             >
                                {row.name}
                              </Box>
                          </StyledTableCell>
                          <StyledTableCell style={{ maxWidth: 80, whiteSpace: 'nowrap' }}>
                            <Box
                              my={1}
                              textOverflow="ellipsis"
                              overflow="hidden"
                              bgcolor="transparent"
                            >
                                {row.meetingParties.length} attendee(s)
                              </Box>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Typography
                              variant="body1"
                              align="center"
                              className={classes.highStyles}
                            >
                              High
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.status}
                          </StyledTableCell>
                        </StyledTableRow>

                      );
                    })
                )
              }

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
      <TablePagination
         rowsPerPageOptions={[5, 10, 25]}
         component="div"
         count={meetings.length}
         rowsPerPage={rowsPerPage}
         page={page}
         onPageChange={handleChangePage}
         onRowsPerPageChange={handleChangeRowsPerPage}
       />
   </div>
  );

}

export default MeetingUpdateArea;
