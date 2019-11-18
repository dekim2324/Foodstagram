import React, { useState, Component } from 'react';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment'


class MyCalendar extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">

        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Pick your date"
          format="MM/dd/yyyy"
          value={this.props.showDate || moment().format('L')}
          onChange={(e) => this.props.handleDateChange(e)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

      </Grid>
    </MuiPickersUtilsProvider>
    )
  }
}


export default MyCalendar;