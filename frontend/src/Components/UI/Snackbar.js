import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

//<SnackBar severity='info' content='' duration={} onClose={()=>} />
export default function CustomizedSnackbars(props) {
  return (
    <Snackbar open autoHideDuration={props.duration === undefined ? 6000 : props.duration} onClose={props.onClose}>
      <Alert onClose={props.onClose} severity={props.severity}>
        {props.content}
      </Alert>
    </Snackbar>
  );
}
