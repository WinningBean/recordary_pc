import React, { useState } from 'react';
import './header.css';
import UserEditor from 'Components/Header/UserEditor';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import LockIcon from '@material-ui/icons/Lock';
import SecurityIcon from '@material-ui/icons/Security';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme => ({
    root: {
        width: '860px',
        height: '600px'
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // width: '200px',
        width: '200px',
        height: '540px',
        boxShadow: '0px 1px 5px lightgray',
    },
    wrap: {
        display:'flex',
        width: '100%',
        height: '540px'
    },
    content: {
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        width: '660px',
        height: '540px',
        padding: '30px 30px',
    }
}));

const SettingMenu = (props) => {

    const classes = useStyles();
    const [editor, setEditor] = useState(null);
    const [listIndex, setListIndex] = useState(0);
    const data = props.data;
    
    // <CustomIconButton onClick={showEditor}><SettingsIcon /></CustomIconButton>

    const currPage = (() => {
        switch(listIndex){
            case 0:
                return <UserEditor/>;
            // case 1:
            //     return <GroupApply data={data} />;
            // case 2:
            //     return <GroupDelete data={data} />;
        }
    })();

    return (
        <Dialog open onClose={()=>props.onClose()}>
            <div className={classes.root}>
                <div className='dialog-header'>
                    <div className='dialog-header-icon'><SettingsIcon style={{ fontSize: '44px' }} /></div>
                    &nbsp;
                    설정
                    <div className='dialog-header-icon' style={{position: 'absolute', right: '5px'}}>
                        <IconButton onClick={()=>props.onClose()} >
                            <CloseIcon style={{color:'#ffffff', fontSize: '20px'}}/>
                        </IconButton>
                    </div>
                </div>
                <div className={classes.wrap}>
                    <List component="nav" className={classes.list}>
                        <ListItem 
                        button
                        selected={listIndex === 0}
                        onClick={()=>{
                            if(listIndex !== 0 ){
                                setListIndex(0);
                            }
                        }}>
                            <ListItemIcon>
                                <PersonOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="계정" />
                        </ListItem>
                        <ListItem
                            button
                            selected={listIndex === 1}
                            >
                            <ListItemIcon>
                                <NotificationsNoneIcon />
                            </ListItemIcon>
                            <ListItemText primary="알림" />
                        </ListItem>
                        <ListItem
                            button
                            selected={listIndex === 2}
                            >
                            <ListItemIcon>
                                <LockIcon />
                            </ListItemIcon>
                            <ListItemText primary="공개범위" />
                        </ListItem>
                        <ListItem
                            button
                            selected={listIndex === 2}
                            >
                            <ListItemIcon>
                                <SecurityIcon />
                            </ListItemIcon>
                            <ListItemText primary="보안" />
                        </ListItem><ListItem
                            button
                            selected={listIndex === 2}
                            >
                            <ListItemIcon>
                                <HelpOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="도움말" />
                        </ListItem>
                    </List>
                </div>
            </div>
        </Dialog>
    )
}

export default SettingMenu;
    