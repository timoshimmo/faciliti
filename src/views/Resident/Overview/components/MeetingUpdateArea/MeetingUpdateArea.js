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
  Box
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

function createMeetingUpdate(date, event, assignee, priority, contact, status) {
  return { date, event, assignee, priority, contact, status };
}

const rows = [
  createMeetingUpdate('12/09/2021', 'Street Lighting Poles', 'Mr. Nyemike Onukwu', 0, '09099048059', 0),
  createMeetingUpdate('12/09/2021', 'Sidewalk drainage zone B', 'Mr. Tokmang Wang', 1, '08057527307', 1),
  createMeetingUpdate('12/09/2021', 'Waste management for Block G', 'Mr. Tobi Musa', 2, '08011223317', 1),
  createMeetingUpdate('12/09/2021', 'Water pipe repairs for Apt 4 Zone A', 'Mr. Afam Ojemeni', 0, '09081346172', 2),
  createMeetingUpdate('12/09/2021', 'Sidewalk drainage zone F', 'Mr. Mubarak Nurideen', 2, '08090233942', 0),
];

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
  }

}));

const MeetingUpdateArea = props => {

  const classes = useStyles();

  return (
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>DATE</StyledTableCell>
              <StyledTableCell>EVENT</StyledTableCell>
              <StyledTableCell>ASSIGNEE</StyledTableCell>
              <StyledTableCell align="center">PRIORITY</StyledTableCell>
              <StyledTableCell align="center">CONTACT</StyledTableCell>
              <StyledTableCell align="center">STATUS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <StyledTableRow key={row.assignee}>
                  <StyledTableCell component="th" scope="row">
                    {row.date}
                  </StyledTableCell>
                  <StyledTableCell style={{ maxWidth: 150, whiteSpace: 'nowrap' }}>
                    <Box
                       component="div"
                       my={1}
                       textOverflow="ellipsis"
                       overflow="hidden"
                       bgcolor="#ffffff"
                     >
                        {row.event}
                      </Box>
                  </StyledTableCell>
                  <StyledTableCell style={{ maxWidth: 120, whiteSpace: 'nowrap' }}>
                    <Box
                       component="div"
                       my={2}
                       textOverflow="ellipsis"
                       overflow="hidden"
                       bgcolor="#ffffff"
                     >
                       {row.assignee}
                     </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography
                      variant="body1"
                      align="center"
                      className={row.priority === 0 ? classes.highStyles : row.priority === 1 ? classes.mediumStyles : classes.lowStyles}
                    >
                      {row.priority === 0 ? 'High' : row.priority === 1 ? 'Medium' : 'Low' }
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.contact}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.status === 0 ? 'Pending' : row.status === 1 ? 'In Progress' : 'Closed' }
                  </StyledTableCell>
                </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );

}

export default MeetingUpdateArea;
