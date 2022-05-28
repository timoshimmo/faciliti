import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TableRow,
  Box,
  Grid,
  TablePagination,
  Paper,
  Chip,
  SvgIcon,
  IconButton,
  Toolbar,
  TextField,
  FormControl,
  FormGroup,
  FormControlLabel,
  InputAdornment,
  Popover,
  Button,
  Checkbox
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AXIOS from '../../../../../util/webservices';
import moment from 'moment';

const rows = [
  {
    "name": "Security Meeting",
     "description": null,
     "createdAt": "2022-05-28T13:10:25.538+00:00",
     "meetingNumber": "1001001",
     "dueBy": "2022-05-30T10:40:00.000+00:00",
     "numberOfAttendees": 2,
     "xri": "xri://@openmdx*org.opencrx.kernel.activity1/provider/CRX/segment/INJREAM26606/activity/R1JEH2B66ZHM4YCN99GJPA8KF",
     "key": {
         "uuid": "R1JEH2B66ZHM4YCN99GJPA8KF"
     },
     "status": "Scheduled"
 },
 {
      "name": "INJREAM Visit",
      "description": "for injreal2 estate",
      "createdAt": "2022-05-28T10:38:44.048+00:00",
      "meetingNumber": "1001000",
      "dueBy": "2022-12-31T21:14:23.000+00:00",
      "numberOfAttendees": 2,
      "xri": "xri://@openmdx*org.opencrx.kernel.activity1/provider/CRX/segment/INJREAM26606/activity/3F9LEQK24Q0OCYCN99GJPA8KF",
      "key": {
          "uuid": "3F9LEQK24Q0OCYCN99GJPA8KF"
      },
      "status": "Scheduled"
  },
  {
      "name": "New Years Meeting",
      "description": null,
      "createdAt": "2022-05-27T21:25:36.937+00:00",
      "meetingNumber": "1000803",
      "dueBy": "2017-05-28T12:30:00.000+00:00",
      "numberOfAttendees": 2,
      "xri": "xri://@openmdx*org.opencrx.kernel.activity1/provider/CRX/segment/INJREAM26606/activity/L6Y9OPSE9OHYKYCN99GJPA8KF",
      "key": {
          "uuid": "L6Y9OPSE9OHYKYCN99GJPA8KF"
      },
      "status": "Scheduled"
  },
  {
      "name": "Exco meeting",
      "description": "first estate meeting",
      "createdAt": "2022-05-27T20:46:21.371+00:00",
      "meetingNumber": "1000802",
      "dueBy": "2022-04-17T21:14:23.000+00:00",
      "numberOfAttendees": 2,
      "xri": "xri://@openmdx*org.opencrx.kernel.activity1/provider/CRX/segment/INJREAM26606/activity/RUDLRWIZN1HIKYCN99GJPA8KF",
      "key": {
          "uuid": "RUDLRWIZN1HIKYCN99GJPA8KF"
      },
      "status": "Scheduled"
  },
  {
      "name": "INJREAM Meeting",
      "description": "for injreal2 estate",
      "createdAt": "2022-05-27T14:34:53.818+00:00",
      "meetingNumber": "1000801",
      "dueBy": "2022-12-31T21:14:23.000+00:00",
      "numberOfAttendees": 2,
      "xri": "xri://@openmdx*org.opencrx.kernel.activity1/provider/CRX/segment/INJREAM26606/activity/3N9K4250LS5WSYCN99GJPA8KF",
      "key": {
          "uuid": "3N9K4250LS5WSYCN99GJPA8KF"
      },
      "status": "Scheduled"
  },
  {
      "name": "Exco meeting",
      "description": "first estate meeting",
      "createdAt": "2022-05-24T21:19:34.687+00:00",
      "meetingNumber": "1000800",
      "dueBy": "2022-04-17T21:14:23.000+00:00",
      "numberOfAttendees": 2,
      "xri": "xri://@openmdx*org.opencrx.kernel.activity1/provider/CRX/segment/INJREAM26606/activity/L6BVW4GRMDYI4WHHUIUROR238",
      "key": {
          "uuid": "L6BVW4GRMDYI4WHHUIUROR238"
      },
      "status": "Scheduled"
  }
];

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
      cursor: "pointer"
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

function DeleteIcon(props) {
  return (
    <SvgIcon {...props} width="16" height="17" viewBox="0 0 16 17">
      <path d="M14.75 3.5L1 3.50001" stroke="#FF2828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.00037 7.25V12.25" stroke="#FF2828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9.75037 7.25V12.25" stroke="#FF2828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.4993 3.5V15.375C13.4993 15.5408 13.4334 15.6997 13.3162 15.8169C13.199 15.9342 13.04 16 12.8743 16H2.87427C2.70851 16 2.54954 15.9342 2.43233 15.8169C2.31512 15.6997 2.24927 15.5408 2.24927 15.375V3.5" stroke="#FF2828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11 3.5V2.25C11 1.91848 10.8683 1.60054 10.6339 1.36612C10.3995 1.1317 10.0815 1 9.75 1H6C5.66848 1 5.35054 1.1317 5.11612 1.36612C4.8817 1.60054 4.75 1.91848 4.75 2.25V3.5" stroke="#FF2828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}

function FilterIcon(props) {
  return (
    <SvgIcon {...props} width="26" height="24" viewBox="0 0 26 24">
      <path d="M2.2558 0.996094H23.1881C23.3769 0.996094 23.5617 1.05094 23.7199 1.15395C23.8781 1.25697 24.003 1.40373 24.0794 1.57639C24.1557 1.74905 24.1803 1.94018 24.1501 2.12655C24.1199 2.31292 24.0362 2.4865 23.9092 2.6262L15.8991 11.4374C15.736 11.6168 15.6456 11.8505 15.6456 12.0929V18.991C15.6456 19.1515 15.606 19.3094 15.5303 19.4509C15.4546 19.5923 15.3451 19.7129 15.2117 19.8019L11.3134 22.4007C11.1667 22.4986 10.9961 22.5547 10.8199 22.5633C10.6437 22.5718 10.4685 22.5323 10.313 22.4491C10.1575 22.3658 10.0275 22.242 9.93682 22.0906C9.84618 21.9393 9.7983 21.7662 9.7983 21.5898V12.0929C9.7983 11.8505 9.70794 11.6168 9.54486 11.4374L1.53469 2.6262C1.40769 2.4865 1.324 2.31292 1.2938 2.12655C1.2636 1.94018 1.28818 1.74905 1.36456 1.57639C1.44094 1.40373 1.56583 1.25697 1.72405 1.15395C1.88227 1.05094 2.067 0.996094 2.2558 0.996094V0.996094Z" stroke="#8692A6" stroke-width="1.94911" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}

const headCells = [
  {
    id: 'created',
    numeric: false,
    label: 'DATE CREATED',
  },
  {
    id: 'title',
    numeric: false,
    label: 'MEETING TITLE',
  },
  {
    id: 'id',
    numeric: false,
    label: 'MEETING ID',
  },
  {
    id: 'due',
    numeric: false,
    label: 'DUE DATE',
  },
  {
    id: 'attendees',
    numeric: true,
    label: 'NUMBER OF ATTENDEES',
  },
  {
    id: 'status',
    numeric: true,
    label: 'STATUS',
  },
  {
    id: 'delete',
    numeric: true,
    label: '',
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
      paddingLeft: 15
    },
    exportLinkStyle: {
      textTransform: 'none',
      fontSize: 11,
      color: '#1565D8',
      fontWeight: 400,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      padding: 0,
      textDecoration: 'underline',
      minHeight: 0,
      minWidth: 0,
      "&:hover": {
        backgroundColor: 'transparent',
      },
    },

  }));

  const { onOpenMenu, onHandleMenuClose, anchorEl, checkid, onMenuClick, checkState, onHandleCheckChange, onHandleFilter, onHandleDialogOpen } = props;
  const styles = toolbarStyles();

  function StyledCheckbox(props) {

    return (
      <Checkbox
        className={styles.checkroot}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(styles.checkIcon, styles.checkedIcon)} />}
        icon={<span className={styles.checkIcon} />}
        inputProps={{ 'aria-label': 'decorative checkbox' }}
        {...props}
      />
    );
  }

  return (
    <Toolbar className={styles.toolbar}>
      <Grid container alignItems='center'>
        <Grid
        item
        lg={5}
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
            Meeting Log
          </Typography>
        </Grid>
        <Grid
        item
        lg={7}>
        <Grid container spacing={2} justify="flex-end" alignItems='center'>
          <Grid
          item
          lg={1.3}>
            <Button
              className={styles.exportLinkStyle}>
              Export CSV
            </Button>
        </Grid>
          <Grid
          item
          lg={5}>
              <FormControl style={{
                fontSize: 10,
                width: '100%'
               }}>
                <TextField
                  id="search-order-input"
                  style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #D6D6D6',
                      borderRadius: 6,
                      padding: '5px 10px',
                      '&$focused': {
                        border: '1px solid #D6D6D6',
                        backgroundrColor: '#FFFFFF',
                      },
                      '&:hover': {
                        border: '1px solid #D6D6D6',
                        backgroundrColor: '#FFFFFF',
                     },
                  }}
                  name="searchOrder"
                  type="text"
                  placeholder="Search"
                  InputProps={{
                    endAdornment: <InputAdornment position="start">
                    <SearchIcon style={{ fontSize: 14, color: '#8692A6' }} />
                  </InputAdornment>,
                    disableUnderline: true,
                    style: {fontSize: 12}
                  }}
                />
              </FormControl>
            </Grid>
            <Grid
            item
            lg={1.2}>
            <IconButton
              aria-describedby={checkid}
              onClick={onMenuClick}
              size="medium"
              >
              <FilterIcon style={{  width: 20, height: 18, fill:'none', }} />
            </IconButton>
                <Popover
                   id={checkid}
                   anchorEl={anchorEl}
                   open={onOpenMenu}
                   onClose={onHandleMenuClose}
                   PaperProps={{
                     style: { width: 200 }
                    }}
                   anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                >
                <FormControl component="fieldset" style={{ marginTop: 10, width: '100%' }}>
                  <FormGroup aria-label="position" style={{ width: '100%' }}>
                     <FormControlLabel
                       value="all"
                       control={<StyledCheckbox name="all" onChange={onHandleCheckChange} checked={checkState.all} />}
                       label="All"
                       labelPlacement="start"
                       classes={{ root: styles.frmControlLabelStyleRoot, label: styles.frmControlLabelStyleLabel }}
                     />
                   </FormGroup>
                 </FormControl>
                 <FormControl component="fieldset" style={{ width: '100%' }}>
                   <FormGroup aria-label="position" style={{ width: '100%' }}>
                      <FormControlLabel
                        value="pending"
                        control={<StyledCheckbox name="pictures" onChange={onHandleCheckChange} checked={checkState.pending} disabled={checkState.all} />}
                        label="Pending"
                        labelPlacement="start"
                        classes={{ root: styles.frmControlLabelStyleRoot, label: styles.frmControlLabelStyleLabel }}
                      />
                    </FormGroup>
                  </FormControl>
                  <FormControl component="fieldset" style={{ width: '100%' }}>
                    <FormGroup aria-label="position" style={{ width: '100%' }}>
                       <FormControlLabel
                         value="closed"
                         control={<StyledCheckbox name="videos" onChange={onHandleCheckChange} checked={checkState.closed} disabled={checkState.all} />}
                         label="Closed"
                         labelPlacement="start"
                         classes={{ root: styles.frmControlLabelStyleRoot, label: styles.frmControlLabelStyleLabel }}
                       />
                     </FormGroup>
                   </FormControl>
                    <Grid
                      container
                      justify="space-evenly"
                      style={{ paddingTop: 10, paddingBottom: 10, borderRadius: 70 }}
                      >
                      <Button
                        onClick={onHandleMenuClose}
                        className={styles.filterCancelButton}
                        onClick={onHandleMenuClose}
                        >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        className={styles.buttonStyle}
                        style= {{ fontSize: 12 }}
                        onClick={onHandleFilter}
                        >
                        Done
                      </Button>
                    </Grid>
                </Popover>
            </Grid>
            <Grid
            item
            lg={3.5}>
            <Button
              className={styles.filterMenuButton}
              variant="contained"
              onClick={onHandleDialogOpen}
              >
              Create New Meeting
            </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  onOpenMenu: PropTypes.bool.isRequired,
  onHandleMenuClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.bool.isRequired,
  checkid: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  onHandleFilter: PropTypes.func.isRequired,
  onHandleDialogOpen: PropTypes.func
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
  paperBody: {
    marginTop: 20
  },

  chipLabelStyle: {
    color: theme.palette.text.content,
    fontSize: 11
  },
  chipStyles: {
    color: theme.palette.text.content,
    borderColor: theme.palette.text.content
  },

}));

const Logs = props => {

  const classes = useStyles();

  const { handleDialogOpen } = props;

  let userData = {};
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('userDetails');
      if(user !== null) {
        const data = JSON.parse(user);
        userData = data;
      }
  }

  const [logs, setLogs] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedRow, setSelectedRow] = useState([]);

  const [checkState, setCheckState] = useState({
   all: false,
   pending: false,
   closed: false,
 });

  const [anchorEl, setAnchorEl] = useState(null);
  const openPostMenu = Boolean(anchorEl);
  const checkid = openPostMenu ? 'simple-popover' : undefined;

  const handleGetAll = () => {

    const obj = {
      segmentName : "INJREAM26606",
      userId : userData.crxDetails.userId,
      index : 0,
      range : 10
    };

    AXIOS.get('http://132.145.58.252:8081/spaciofm/api/meetings/', obj)
      .then(response => {
        const res = response.data;
        console.log(res);
      })
      .catch(function (error) {
        console.log(error.response);
        console.log(error.message);
      })
  }

  const handleSelectedRow = (index) => {
    const selectedRow = rows[index];
    setSelectedRow(selectedRow);
    console.log("SELECTED ROW:" + JSON.stringify(selectedRow));
  };

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

 const handleCheckChange =(event) => {
   setCheckState({...checkState, [event.target.name]: event.target.checked});
 }

 const handleMenuClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

const handleFilter = () => {

}

 const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Paper style={{ width: '100%' }}>
      <div className={classes.paperBody}>
        <EnhancedTableToolbar
          onOpenMenu={openPostMenu}
          onHandleMenuClose={handleMenuClose}
          anchorEl={anchorEl}
          checkid={checkid}
          onMenuClick={handleMenuClick}
          checkState={checkState}
          onHandleCheckChange={handleCheckChange}
          onHandleFilter={handleFilter}
          onHandleDialogOpen={handleDialogOpen}/>
        <div>
          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}/>
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {

                    return (
                      <StyledTableRow hover role="button" key={row.key.uuid} onClick={()=>handleSelectedRow(index)}>
                        <StyledTableCell component="th" scope="row">
                            {moment(row.createdAt).format('DD/MM/YYYY hh:mm:ss A')}
                        </StyledTableCell>
                        <StyledTableCell style={{ maxWidth: 100, whiteSpace: 'nowrap' }}>
                          <Box
                             component="div"
                             my={2}
                             textOverflow="ellipsis"
                             overflow="hidden"
                             bgcolor="transparent"
                           >
                             {row.name}
                           </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                             {row.key.uuid}
                        </StyledTableCell>
                        <StyledTableCell>
                          {moment(row.dueBy).format('DD/MM/YYYY hh:mm:ss A')}
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ maxWidth: 80, whiteSpace: 'nowrap' }}>
                        <Box
                           component="div"
                           my={1}
                           textOverflow="ellipsis"
                           overflow="hidden"
                           bgcolor="transparent"
                         >
                            {row.numberOfAttendees} attendee(s)
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.status === "Scheduled" ?
                          <Chip
                            label="Scheduled"
                            variant="outlined"
                            classes={{ root: classes.chipStyles, label: classes.chipLabelStyle }}
                          />
                          :
                          <Chip
                            label="Pending"
                            variant="outlined"
                            classes={{ root: classes.chipStyles, label: classes.chipLabelStyle }}
                          />
                        }
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton size="small">
                            <DeleteIcon style={{  width: 16,height: 17, fill:'none', }} />
                          </IconButton>
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
          <TablePagination
             rowsPerPageOptions={[5, 10, 25]}
             component="div"
             count={rows.length}
             rowsPerPage={rowsPerPage}
             page={page}
             onPageChange={handleChangePage}
             onRowsPerPageChange={handleChangeRowsPerPage}
           />
        </div>
      </div>


   </Paper>
  );
}

export default Logs;
