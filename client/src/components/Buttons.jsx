import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function Buttons(props) {
  const classes = useStyles();

  return (
    <div style={style}>

      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={e => props.handleImage(e)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload Food!
        </Button>
      </label>

      <Button variant="contained" color="primary" className={classes.button} onClick={e => props.handleUpload(e)}>
        Submit
      </Button>
    </div>
  );
}

const style = {
  marginTop: '30px',
  textAlign: 'center'
}