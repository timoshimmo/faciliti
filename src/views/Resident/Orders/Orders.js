import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  TextField,
  FormControl,
  FormGroup,
  FormControlLabel,
  InputAdornment,
  Popover,
  SvgIcon,
  Box,
  Checkbox,
  Button,
  Paper,
  IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AXIOS from '../../../util/webservices';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useModalAction } from '../../modal/modal-context.tsx';

function createData(datecreated, title, description, datedue, tags, status) {
  return {
    datecreated,
    title,
    description,
    datedue,
    tags,
    status
  };
}

const rows = [
  createData('12/09/2021', 'Tree & Light works', 'Vendor was on site on time at 3pm and fixed all issues', '12/09/2021', 3, 0),
  createData('12/09/2021', 'Drainage and sound', 'Vendor was on site on time at 3pm and fixed all issues', '12/09/2021', 0, 1),
  createData('12/09/2021', 'Tree & Light works', 'Vendor was on site on time at 3pm and fixed all issues', '12/09/2021', 5, 1),
  createData('12/09/2021', 'Drainage and sound', 'Vendor was on site on time at 3pm and fixed all issues', '12/09/2021', 2, 0),
  createData('12/09/2021', 'Tree & Light works', 'Vendor was on site on time at 3pm and fixed all issues', '12/09/2021', 0, 0),
  createData('12/09/2021', 'Drainage and sound', 'Vendor was on site on time at 3pm and fixed all issues', '12/09/2021', 0, 1),
  createData('12/09/2021', 'Tree & Light works', 'Vendor was on site on time at 3pm and fixed all issues', '12/09/2021', 1, 0),
  createData('12/09/2021', 'Drainage and sound', 'Vendor was on site on time at 3pm and fixed all issues', '12/09/2021', 7, 1),
  createData('12/09/2021', 'Tree & Light works', 'Vendor was on site on time at 3pm and fixed all issues', '12/09/2021', 9, 1),
  createData('12/09/2021', 'Tree & Light works', 'Vendor was on site on time at 3pm and fixed all issues', '12/09/2021', 0, 1),
  createData('12/09/2021', 'Drainage and sound', 'Vendor was on site on time at 3pm and fixed all issues', '12/09/2021', 0, 0),
  createData('12/09/2021', 'Tree & Light works', 'Vendor was on site on time at 3pm and fixed all issues', '12/09/2021', 6, 0),
  createData('12/09/2021', 'Drainage and sound', 'Vendor was on site on time at 3pm and fixed all issues', '12/09/2021', 4, 1),
];

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
    paddingTop: 5,
    paddingBottom: 5
  },
}))(TableCell);

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

function CalendarIcon(props) {
  return (
    <SvgIcon {...props} width="20" height="20" viewBox="0 0 20 20">
      <path d="M15 12V10H13V12H15Z" fill="#8692A6"/>
      <path d="M11 12H9V10H11V12Z" fill="#8692A6"/>
      <path d="M7 12V10H5V12H7Z" fill="#8692A6"/>
      <path d="M15 14V16H13V14H15Z" fill="#8692A6"/>
      <path d="M9 16H11V14H9V16Z" fill="#8692A6"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M6 1H14V0H16V1H18C19.1046 1 20 1.89543 20 3V18C20 19.1046 19.1046 20 18 20H2C0.89543 20 0 19.1046 0 18V3C0 1.89543 0.89543 1 2 1H4V0H6V1ZM14 4H16V3H18V6H2V3H4V4H6V3H14V4ZM2 8H18V18H2V8Z" fill="#8692A6"/>
    </SvgIcon>
  );
}

function EditIcon(props) {
  return (
    <SvgIcon {...props} width="20" height="21" viewBox="0 0 20 21">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.4374 0C15.0921 0 15.7197 0.26142 16.1781 0.723423L19.279 3.82432C19.7407 4.286 20.0001 4.91217 20.0001 5.56508C20.0001 6.21799 19.7407 6.84416 19.279 7.30584L7.95751 18.6238C7.25902 19.4295 6.2689 19.9245 5.1346 20.0023H0L0.00324765 14.7873C0.0884382 13.7328 0.578667 12.7523 1.3265 12.0934L12.6954 0.724628C13.1564 0.26083 13.7834 0 14.4374 0ZM5.06398 18.0048C5.59821 17.967 6.09549 17.7184 6.49479 17.2616L14.0567 9.69972L10.3023 5.94519L2.6961 13.5496C2.29095 13.9079 2.04031 14.4092 2 14.8678V18.0029L5.06398 18.0048ZM11.7167 4.53115L15.4709 8.2855L17.8648 5.89162C17.9514 5.80502 18.0001 5.68756 18.0001 5.56508C18.0001 5.4426 17.9514 5.32514 17.8648 5.23854L14.7611 2.13486C14.6755 2.04855 14.5589 2 14.4374 2C14.3158 2 14.1992 2.04855 14.1136 2.13486L11.7167 4.53115Z" fill="#C7C7C7"/>
    </SvgIcon>
  );
}

function DeleteIcon(props) {
  return (
    <SvgIcon {...props} width="24" height="24" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill="#FF0000"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.0849 11.1515L15.9033 7.3331L16.7518 8.18162L12.9334 12L16.7518 15.8184L15.9033 16.6669L12.0849 12.8485L8.26651 16.6669L7.41799 15.8184L11.2364 12L7.41799 8.18162L8.26651 7.3331L12.0849 11.1515Z" fill="white" stroke="white"/>
    </SvgIcon>
  );
}

const headCells = [
  {
    id: 'created',
    numeric: false,
    label: 'Date Created',
  },
  {
    id: 'title',
    numeric: false,
    label: 'Title',
  },
  {
    id: 'description',
    numeric: false,
    label: 'Description',
  },
  {
    id: 'due',
    numeric: false,
    label: 'Date Due',
  },
  {
    id: 'tags',
    numeric: false,
    label: 'Tags',
  },
  {
    id: 'status',
    numeric: true,
    label: 'Status',
  },
  {
    id: 'edit',
    numeric: true,
    label: '',
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
      textTransform: 'none',
      fontSize: 13,
      color: '#696F79',
      fontWeight: 400,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      padding:0,
      minHeight: 0,
      minWidth: 0,
      "&:hover": {
        backgroundColor: 'transparent',
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
    }

  }));

  const { onOpenMenu, onHandleMenuClose, anchorEl, checkid, onMenuClick, checkState, onHandleCheckChange, onHandleFilter } = props;
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
    <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Grid container>
        <Grid
        item
        lg={3}>
        <Typography
            variant="h4"
            gutterBottom
            style={{
              fontSize: 18,
              color: '#494949',
              fontWeight: 600,
            }}
          >
            Order Log
          </Typography>
        </Grid>
        <Grid
        item
        lg={9}>
        <Grid container spacing={1} justifyContent="flex-end">
          <Grid
          item
          lg={3}
          className={styles.gridItemStyles}>
              <FormControl style={{
                fontSize: 10,
                width: 150,
               }}>
                <TextField
                  id="search-order-input"
                  style={{
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #D6D6D6',
                      borderRadius: 6,
                      padding: '7px 15px',
                      width: 150,
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
            lg={3}
            className={styles.gridItemStyles}>
              <Button
                aria-describedby={checkid}
                onClick={onMenuClick}
                className={styles.filterMenuButton}
                endIcon={<ExpandMoreIcon className={clsx({[styles.dropdown]: true, [styles.dropdownOpen]: onOpenMenu })} />}
                >
                Show All
              </Button>
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
            lg={1}
            className={styles.gridItemStyles}>
              <IconButton size="small">
                <CalendarIcon style={{  width: 15,height: 15, fill:'none', }} />
              </IconButton>
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
  anchorEl: PropTypes.bool,
  checkid: PropTypes.string,
  onMenuClick: PropTypes.func.isRequired,
  onHandleFilter: PropTypes.func.isRequired,
};


const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100%',
    background: '#efefef'
  },
  grid: {
    minHeight: '100%',
    padding: 40
  },
  areaTitle: {
    fontSize: 18,
    color: theme.palette.secondary.dark,
    fontWeight: 600,
  },
  toolbarGrid: {

  },
  table: {
    maxWidth: '100%',
  },
  icnBtnStyle: {
    borderRadius: 4,
    backgroundColor: ' rgba(134, 146, 166, 0.15)',
    padding: 7
  },
  buttonProgress: {
     color: theme.palette.primary.main,
     marginTop: 10,
     marginBottom: 10,
     marginLeft: '50%',
     zIndex: 10
   }
}));

const Orders = props => {

    const classes = useStyles();

    const { openModal } = useModalAction();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const [orderLogs, setOrderLogs] = useState([]);

    const [checkState, setCheckState] = useState({
     all: false,
     pending: false,
     closed: false,
   });

    const [anchorEl, setAnchorEl] = useState(null);
    const openPostMenu = Boolean(anchorEl);
    const checkid = openPostMenu ? 'simple-popover' : undefined;

    useEffect(() => {
      handleGetAll();
   }, []);

    const handleGetAll = () => {

        if(!loading) {
          setLoading(true);


          AXIOS.get(`resorders/?index=${page}&range=${rowsPerPage}`)
            .then(response => {
              setLoading(false);
              const res = response.data.response;
        //      console.log("RES ORDER:" + JSON.stringify(res));
              setOrderLogs(res);
            })
            .catch(function (error) {
              setLoading(false);
              console.log(error.response);
              console.log(error.message);
            })
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

  const handleRowClick = (event, row) => {
    //  console.log("ROW: " + JSON.stringify(row));
      return openModal('RESIDENT_ORDER', row);
  }

   const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//const { onOpenMenu, onHandleMenuClose, anchorEl, checkid, onMenuClick, checkState, onHandleCheckChange, onHandleFilter } = props;
//const { order, orderBy, rowCount, onRequestSort } = props;
    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
          direction="column">
          <Grid
          item
          lg={12}>

            <EnhancedTableToolbar
              onOpenMenu={openPostMenu}
              onHandleMenuClose={handleMenuClose}
              anchorEl={anchorEl}
              checkid={checkid}
              onMenuClick={handleMenuClick}
              checkState={checkState}
              onHandleCheckChange={handleCheckChange}
              onHandleFilter={handleFilter}/>
              <Paper style={{ width: '100%', mb: 2 }}>
                <TableContainer>
                  {loading && <CircularProgress size={25} className={classes.buttonProgress} /> }
                  <Table className={classes.table} aria-label="orders table">
                    <EnhancedTableHead
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={rows.length}/>
                      <TableBody>
                      {stableSort(orderLogs, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {

                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={row.key.uuid}
                            >
                              <StyledTableCell
                                component="th"
                                id={labelId}
                              >
                                {moment(row.createdAt).format('DD/MM/YYYY')}
                              </StyledTableCell>
                              <StyledTableCell style={{ maxWidth: 80, whiteSpace: 'nowrap' }}>
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
                              <StyledTableCell style={{ maxWidth: 120, whiteSpace: 'nowrap' }}>
                                <Box
                                   component="div"
                                   my={1}
                                   textOverflow="ellipsis"
                                   overflow="hidden"
                                   bgcolor="transparent"
                                 >
                                  {row.description}
                                </Box>
                              </StyledTableCell>
                              <StyledTableCell>{moment(row.dueBy).format('DD/MM/YYYY')}</StyledTableCell>
                              <StyledTableCell>{row.numberOfTaggedContact}</StyledTableCell>
                              <StyledTableCell>
                                { row.status === 'Opened' ? 'Open' : 'Closed' }
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <IconButton
                                  className={classes.icnBtnStyle}
                                  onClick={(event) => handleRowClick(event, row)}
                                  >
                                  <EditIcon style={{  width: 12,height: 12, fill:'none', }} />
                                </IconButton>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <IconButton size="small">
                                  <DeleteIcon style={{  width: 18,height: 18, fill:'none', }} />
                                </IconButton>
                              </StyledTableCell>
                            </TableRow>
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
                   count={orderLogs.length}
                   rowsPerPage={rowsPerPage}
                   page={page}
                   onPageChange={handleChangePage}
                   onRowsPerPageChange={handleChangeRowsPerPage}
                 />
              </Paper>
          </Grid>
        </Grid>
      </div>
    );
}

export default Orders;
