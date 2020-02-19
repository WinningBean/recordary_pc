import React, { useState } from 'react';
import GroupModify from 'Components/Group/GroupModify';
import GroupDelete from 'Components/Group/GroupDelete';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';
import GroupIcon from '@material-ui/icons/Group';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

const GroupSetting = (props) => {
    const classes = useStyles();
    
    const [listIndex, setListIndex] = useState(0);
    const data = props.data;

    const currPage = (() => {
        switch(listIndex){
            case 0:
                return <GroupModify group={data} />;
            case 1:
                return <GroupDelete group={data}/>;
        }
    })();

    return (
        <Dialog open onClose={()=>props.onClose()}>
            <div className={classes.root}>
                <div className='dialog-header'>
                    <div className='dialog-header-icon'><GroupIcon style={{ fontSize: '44px' }} /></div>
                    &nbsp;
                    그룹 관리
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
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary="프로필 수정" />
                        </ListItem>
                        <ListItem
                            button
                            selected={listIndex === 1}
                            onClick={() => {
                                if (listIndex !== 1) {
                                    setListIndex(1);
                                }
                            }}>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemText primary="그룹 삭제" />
                        </ListItem>
                    </List>
                    <div className={classes.content}>
                        {currPage}
                    </div>
                </div>
            </div>

        </Dialog>
    );
}

export default GroupSetting;