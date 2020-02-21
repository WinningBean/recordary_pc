import React, { useState } from 'react';
import './group.css';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import store from 'store';

const useStyles = makeStyles(theme => ({
    content: {
        display : 'flex',
        flexDirection: 'column'
    },
    marginBottom : {
        marginBottom: '10px'
    }
}));

const GroupApply = (props) => {
    const classes = useStyles();

    const [group, setGroup] = useState(props.group);
    const [user_id, setUser_id] = useState(store.getState().user.currentUser.user_id);
    const [applyUser, setApplyUser] = useState('');

    return (
        <div className="dialog-wrap">
            <DialogContent className={classes.content}>
                <TextField
                    className={classes.marginBottom}
                    label="그룹명"
                    name='group_nm'
                    defaultValue={group.group_nm}
                    disabled
                />
                <TextField
                    className={classes.marginBottom}
                    label="그룹 상태메세지"
                    name='group_nm'
                    defaultValue={group.group_ex}
                    disabled
                />
                <TextField
                    label="그룹장"
                    name='group_ex'
                    defaultValue={group.group_admin}
                    disabled
                />
                <TextField
                    label="초대 유저"
                    name='apply_user'
                    onChange={(e)=>{
                        setApplyUser(e.target.value);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    color="secondary"
                    onClick={async ()=>{
                        const form = new FormData();
                        form.append('user_id', user_id);
                        form.append('group_cd', group.group_cd);
                        form.append('apply_user', applyUser);
                        const { data } = await axios.post('http://localhost:8080/apply', form);
                        if(data.isSuccess){
                            console.log('완료');
                            return;
                        }
                        console.log('실패');
                    }}
                >초대</Button>
            </DialogActions>
        </div>
    );
}

export default GroupApply;
