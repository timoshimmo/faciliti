import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TableRow,
  TablePagination,
  Paper,
  SvgIcon,
  Toolbar,
  TextField,
  FormControl,
  InputAdornment,
  Button,
  Checkbox,
  Box
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import { useModalAction } from '../../../../modal/modal-context.tsx';
import CurrencyFormat from 'react-currency-format';
import AXIOS from '../../../../../util/webservices';


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
    paddingTop: 5,
    paddingBottom: 5,
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

/*
function FilterIcon(props) {
  return (
    <SvgIcon {...props} width="22" height="21" viewBox="0 0 22 21">
      <path d="M1.85183 1H20.1482C20.3132 1 20.4747 1.04794 20.613 1.13798C20.7513 1.22802 20.8604 1.3563 20.9272 1.50722C20.9939 1.65814 21.0154 1.8252 20.989 1.9881C20.9626 2.151 20.8895 2.30272 20.7785 2.42483L13.777 10.1264C13.6345 10.2832 13.5555 10.4875 13.5555 10.6994V16.7289C13.5555 16.8691 13.5209 17.0072 13.4547 17.1308C13.3885 17.2544 13.2928 17.3598 13.1762 17.4376L9.76885 19.7092C9.64057 19.7947 9.49147 19.8438 9.33747 19.8512C9.18347 19.8587 9.03034 19.8242 8.8944 19.7514C8.75846 19.6787 8.64482 19.5704 8.56559 19.4381C8.48636 19.3059 8.44451 19.1546 8.44451 19.0004V10.6994C8.44451 10.4875 8.36553 10.2832 8.22299 10.1264L1.22153 2.42483C1.11052 2.30272 1.03737 2.151 1.01097 1.9881C0.984571 1.8252 1.00606 1.65814 1.07282 1.50722C1.13958 1.3563 1.24874 1.22802 1.38704 1.13798C1.52533 1.04794 1.6868 1 1.85183 1V1Z" stroke="#1B75BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}

function ExportIcon(props) {
  return (
    <SvgIcon {...props} width="22" height="21" viewBox="0 0 25 25">
      <path d="M6.75 9.75138L12 15L17.25 9.75138M12 1V14.9963M23 15V22C23 22.2652 22.8946 22.5196 22.7071 22.7071C22.5196 22.8946 22.2652 23 22 23H2C1.73478 23 1.48043 22.8946 1.29289 22.7071C1.10536 22.5196 1 22.2652 1 22V15" stroke="#1B75BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}



function RightArrowIcon(props) {
  return (
    <SvgIcon {...props} width="22" height="21" viewBox="0 0 25 25">
      <path d="M1 10.5H23" stroke="#8692A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 1.5L23 10.5L14 19.5" stroke="#8692A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}

*/

const headCells = [
  {
    id: 'createdAt',
    numeric: false,
    label: 'DATE CREATED',
  },
  {
    id: 'serviceType',
    numeric: false,
    label: 'SERVICE TYPE',
  },
  {
    id: 'serviceId',
    numeric: false,
    label: 'SERVICE ID',
  },
  {
    id: 'numberOfResidents',
    numeric: false,
    label: 'No. of RESIDENTS',
  },
  {
    id: 'charge',
    numeric: false,
    label: 'CHARGE',
  },
  {
    id: 'frequency',
    numeric: true,
    label: 'FREQUENCY',
  },
  {
    id: 'delete',
    numeric: true,
    label: '',
  },
];

/*

,
{
  id: 'category',
  numeric: false,
  label: 'CATEGORY',
},
{
  id: 'creator',
  numeric: false,
  label: 'CREATOR',
}

<StyledTableCell>
    {row.category}
</StyledTableCell>
<StyledTableCell style={{ maxWidth: 80, whiteSpace: 'nowrap' }}>
<Box
   component="div"
   my={1}
   textOverflow="ellipsis"
   overflow="hidden"
   bgcolor="transparent"
 >
    {row.creator}
  </Box>
</StyledTableCell>

*/

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

    const { onHandleSearch } = props;
    const styles = toolbarStyles();

    /*function StyledCheckbox(props) {

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

    */

    return (
      <Toolbar className={styles.toolbar}>
        <Grid container alignItems='center'>
          <Grid
          item
          lg={4}
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
              Service List
            </Typography>
          </Grid>
          <Grid
          item
          lg={8}>
          <Grid container spacing={2} justifyContent="flex-end" alignItems='center'>
            <Grid
            item
            lg={6}>
                <FormControl style={{
                  fontSize: 10,
                  width: '100%'
                 }}>
                  <TextField
                    id="search-order-input"
                    style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #8692A6',
                        borderRadius: 6,
                        padding: '5px 10px',
                        '&$focused': {
                          border: '1px solid #8692A6',
                          backgroundrColor: '#FFFFFF',
                        },
                        '&:hover': {
                          border: '1px solid #8692A6',
                          backgroundrColor: '#FFFFFF',
                       },
                    }}
                    name="searchOrder"
                    type="text"
                    placeholder="Search"
                    onChange={onHandleSearch}
                    InputProps={{
                      endAdornment: <InputAdornment position="start">
                      <SearchIcon style={{ fontSize: 16, color: '#1B75BC' }} />
                    </InputAdornment>,
                      disableUnderline: "true",
                      style: {fontSize: 12}
                    }}
                  />
                </FormControl>
              </Grid>
              {/*
              <Grid
              item
              lg={1.5}>
                <Button
                  variant="outlined"
                  aria-describedby={checkid}
                  onClick={onMenuClick}
                  className={styles.exportLinkStyle}
                  startIcon={<FilterIcon style={{  fontSize: 16, fill:'none', paddingRight: 10 }} />}
                  >
                  Filter
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
                      justifyContent="space-evenly"
                      style={{ paddingTop: 10, paddingBottom: 10, borderRadius: 70 }}
                      >
                      <Button
                        onClick={onHandleMenuClose}
                        className={styles.filterCancelButton}
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
              lg={1.5}>
              <Button
                variant="outlined"
                aria-describedby={checkid}
                onClick={onMenuClick}
                className={styles.exportLinkStyle}
                startIcon={<ExportIcon style={{ fontSize: 16, fill:'none', paddingRight: 10}} />}
                >
                Export
              </Button>

              </Grid>

                */}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    onHandleSearch: PropTypes.func.isRequired,
  };

  const useStyles = makeStyles(theme => ({

   table: {
     maxWidth: '100%',
   },
   failedStyles: {
     color: theme.palette.priority.red,
     borderColor: theme.palette.priority.red
   },
   failedLabelStyles : {
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
   buttonProgress: {
      color: theme.palette.primary.main,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: '50%',
      zIndex: 10
    },
    plainButtonStyle: {
      textTransform: 'none',
      fontSize: 12,
      color: theme.palette.primary.main,
      fontWeight: 400,
      padding: '7px 10px',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      "&:hover": {
        backgroundColor: 'transparent',
      },
    },
  }));

  const ServicesTable = () => {

    const classes = useStyles();

   // const [anchorEl, setAnchorEl] = useState(null);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);

    const [services, setServices] = useState([]);
    const [serviceList, setServiceList] = useState([]);
/*
    const [checkState, setCheckState] = useState({
     all: false,
     pending: false,
     closed: false,
   });

   */

   const { openModal } = useModalAction();

   // openPostMenu = Boolean(anchorEl);
  // const checkid = openPostMenu ? 'simple-popover' : undefined;

   useEffect(() => {
     handleGetAll();
  }, []);

    const handleGetAll = () => {

      AXIOS.get('contracts/?index=0&range=100')
        .then(response => {
            const res = response.data;
            //setServices(res.response);
            //setLoading(false);
            res.response.map((contract)=> {

              AXIOS.get(`contracts/${contract.key.uuid}/charges?index=0&range=100`)
                .then(resp => {
                    const res1 = resp.data;
                  //  console.log("CHARGES DATA:" + JSON.stringify(res1));
                  //  console.log("CONTRACT KEY:" + JSON.stringify(contract));
                    const obj = res1.response;
                    const chargeData =
                      {
                        segmentName: contract.segmentName,
                        userId: contract.userId,
                        createdAt: contract.createdAt,
                        serviceType: contract.serviceType,
                        serviceId: contract.serviceId,
                        numberOfResidents: contract.numberOfResidents,
                        charge: contract.charge,
                        frequency: contract.frequency,
                        category: contract.category,
                        creator: contract.creator,
                        key: contract.key,
                        chargeData: obj
                      };

                  //  console.log("MY Charges:" + JSON.stringify(chargeData));
                    //setCharges(res.response);
                    setServices(services => [...services, chargeData]);
                    setServiceList(serviceList => [...serviceList, chargeData])
                    setLoading(false);
                    //setServices(res.response);
                })
                .catch(function (error) {
                    setLoading(false);
                    console.log(error.response);
                    console.log(error.message);
                })
            })


        })
        .catch(function (error) {
            setLoading(false);
            console.log(error.response);
            console.log(error.message);
        })
    }

    const handleOpenPayment = (contract) => {
      //console.log("OPEN PAYMENT", contract);
      return openModal('PAYMENT_FM', {contract});
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

  const handleSearchChange = event => {
    let newList = [];
    let query = event.target.value;
    //.log(serviceList);
    newList = query ? serviceList.filter(service => service.serviceType.includes(query) || 
    service.serviceId.includes(query)) : serviceList;
    //console.log(newList);
    setServices(newList);
 }

 /*
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
   console.log("FILTER DATA!");
 }

 const handleOpenServiceContract = (contractDetails) => {
   const editStatus = true;
   return openModal('SERVICE_CONTRACT', { editStatus, contractDetails });
 }
*/

 const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - services.length) : 0;


    return (
      <Paper style={{ width: '100%' }}>
        <div className={classes.paperBody}>
          <EnhancedTableToolbar
            onHandleSearch={handleSearchChange} />
          <div>
            {loading && <CircularProgress size={25} className={classes.buttonProgress} /> }
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}/>
                <TableBody>
                  {/* Add to StyledTabRow for click action
                      onClick={()=>handleOpenServiceContract(row)}
                  */}
                  {stableSort(services, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <StyledTableRow hover role="button" key={row.index}>
                          <StyledTableCell component="th" scope="row">
                              {moment(row.createdAt).format('DD/MM/YYYY')}
                          </StyledTableCell>
                          <StyledTableCell style={{ maxWidth: 120, whiteSpace: 'nowrap' }}>
                            <Box
                               component="div"
                               my={2}
                               textOverflow="ellipsis"
                               overflow="hidden"
                               bgcolor="transparent"
                             >
                               {row.serviceType}
                             </Box>
                          </StyledTableCell>
                          <StyledTableCell style={{ maxWidth: 80, whiteSpace: 'nowrap' }}>
                            <Box
                               component="div"
                               my={2}
                               textOverflow="ellipsis"
                               overflow="hidden"
                               bgcolor="transparent"
                             >
                               {row.serviceId}
                             </Box>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                              1
                          </StyledTableCell>
                          <StyledTableCell>
                            {row.charge !== null ?
                              (<CurrencyFormat value={row.charge} displayType={'text'} thousandSeparator={true} prefix={'₦'} />)
                              :
                              null
                            }

                          </StyledTableCell>
                          <StyledTableCell align="center">
                              {row.frequency}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              variant="outlined"
                              className={classes.plainButtonStyle}
                              onClick={()=>handleOpenPayment(row)}
                              >
                              Pay Offline
                            </Button>
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
               count={services.length}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage}
             />
          </div>
        </div>
     </Paper>
    );
  };


  export default ServicesTable;
