import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/styles';
import {
  Tabs,
  Tab,
  Typography,
  Box
} from '@material-ui/core';
import { ServiceChargeTable, TransactionHistoryTable } from './components'

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #C4C4C4',
  },
  indicator: {
    backgroundColor: '#C4C4C4',
    height: 3,
    paddingBottom: 2
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: 500,
    marginRight: theme.spacing(4),
    color: '#C4C4C4',
    fontFamily: [
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
    '&:hover': {
      color: '#494949',
      opacity: 1,
    },
    '&$selected': {
      color: '#494949',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#494949',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles(theme => ({

  root: {
   width: '100%',
   marginTop: 40
 },
 tabArea: {
  flexGrow: 1,
},
tableArea: {
  width: '100%'
},
 padding: {
   padding: 25,
 },

}));

const TransactionsArea = props => {

  const classes = useStyles();

  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.tabArea}>
       <AntTabs value={value} onChange={handleChange} aria-label="ant example">
         <AntTab label="Transaction History" />
         <AntTab label="Service Charge" />
       </AntTabs>
       <Typography className={classes.padding} />
     </div>
     <div className={classes.tableArea}>
       <TabPanel value={value} index={0}>
          <TransactionHistoryTable />
       </TabPanel>
       <TabPanel value={value} index={1}>
          <ServiceChargeTable />
       </TabPanel>
     </div>
    </div>
  );

}

export default TransactionsArea;
