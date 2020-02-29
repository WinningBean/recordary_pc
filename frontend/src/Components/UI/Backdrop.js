import React from 'react';
import Backdrops from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}));

export default function Backdrop() {
    const classes = useStyles();

    return (
        <Backdrops className={classes.backdrop} open>
            <CircularProgress color='inherit' />
        </Backdrops>
    );
}
