import React, { useState, useEffect } from 'react';
import GroupModify from 'Containers/Group/GroupModify';
import GroupDelete from 'Components/Group/GroupDelete';
import GroupApply from 'Components/Group/GroupApply';

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
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

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
    const [info, setInfo] = useState(null);
    const data = props.data;

    const currPage = (() => {
        switch(listIndex){
            case 0:
                return <GroupModify data={data} pic={info !== null ? info.group_pic : null} />;
            case 1:
                return <GroupApply data={data} info={info !== null ? info : null} />;
            case 2:
                return <GroupDelete data={data} />;
        }
    })();

    useEffect(()=>{
        // const info = (await axios.post('/group/info',{params:{group_cd:data.group.group_cd}})).data;
        const info = {
            admin: {
                user_id: 'admin048',
                user_pic: 'http://placehold.it/40x40',
                user_nm: '어드민'
            },
            group_pic:'http://placehold.it/250x250',
            member: [
                {
                    user_id:'abcd1234',
                    user_pic:'http://placehold.it/40x40',
                    user_nm:'홍길동'
                },
                {
                    user_id:'kkk8874',
                    user_pic:'http://placehold.it/40x40',
                    user_nm:'김길동'
                }
            ]
        };
        setInfo(info);
    }, [])

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
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText primary="그룹 초대" />
                        </ListItem>
                        <ListItem
                            button
                            selected={listIndex === 2}
                            onClick={() => {
                                if (listIndex !== 2) {
                                    setListIndex(2);
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