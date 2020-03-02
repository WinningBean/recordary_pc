import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ShareIcon from '@material-ui/icons/Share';
import PostMediaScheduleAppend from 'Components/Profile/PostMediaScheduleAppend';
import PostShare from 'Components/Profile/PostShare';

const useStyles = makeStyles(theme => ({
    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1
    },
    exampleWrapper: {
        position: 'relative',
        marginTop: theme.spacing(3),
        height: 380
    },
    radioGroup: {
        margin: theme.spacing(1, 0)
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2)
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2)
        }
    }
}));


export default function SpeedDials() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const [postMediaScheduleClick, setPostMediaScheduleClick] = React.useState(null);
    const [postShareClick, setPostShareClick] = React.useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const PostMediaScheduleWrite = () => {
        if(postMediaScheduleClick === null){
            setPostMediaScheduleClick(<PostMediaScheduleAppend onCancel={()=> setPostMediaScheduleClick(null)}/>);
            return;
        }
        setPostMediaScheduleClick(null);
        return null;
    }
    const PostShareForm = () => {
        if(postShareClick === null){
            setPostShareClick(<PostShare onCancel={()=> setPostShareClick(null)}/>);
            return;
        }
        setPostShareClick(null);
        return null;
    }

    return (
        <div className={classes.root}>
            <div className={classes.exampleWrapper}>
                <SpeedDial
                    ariaLabel='SpeedDial example'
                    className={classes.speedDial}
                    hidden={hidden}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >
                    <SpeedDialAction
                        key={'PostAppend'}
                        icon={<PostAddIcon />}
                        tooltipTitle={'PostAppend' }
                        onClick={PostMediaScheduleWrite}
                    />
                    <SpeedDialAction
                        key={'PosShared'}
                        icon={ <ShareIcon />}
                        tooltipTitle={'PosShared'}
                        onClick={PostShareForm}
                    />
                    {postMediaScheduleClick}
                    {postShareClick}
                </SpeedDial>
            </div>
        </div>
    );
}
