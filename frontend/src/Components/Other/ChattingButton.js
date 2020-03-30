import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function ChattingButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab style={{ backgroundColor: '#910033', color: 'white' }} aria-label='chatting'>
        <QuestionAnswerIcon />
      </Fab>
    </div>
  );
}
