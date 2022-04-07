import React, { useState } from 'react';
//import { makeStyles } from '@material-ui/styles';
import { DatePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers";
//import AdapterDateFns from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
//import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
//import StaticDatePicker from '@material-ui/lab/StaticDatePicker';

/*const useStyles = makeStyles(theme => ({

})); */

/*

<LocalizaitonProvider>
 <StaticDatePicker
   orientation="portrait"
   openTo="date"
   value={value}
   onChange={(newValue) => {
     setValue(newValue);
   }}
   renderInput={(params) => <TextField {...params} variant="standard" />}
 />
</LocalizaitonProvider>

*/

const CalendarComponent = props => {

    const [value, setValue] = useState(new Date());


    return (
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            autoOk
            orientation="portrait"
            value={value}
            openTo="date"
            variant="static"
            format="dd/MM/yyyy"
            helperText="Something"
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </MuiPickersUtilsProvider>
      </div>

    );

};


export default CalendarComponent;
