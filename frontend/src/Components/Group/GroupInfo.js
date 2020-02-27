import React, { useState } from 'react';
import './group.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    content: {
        width: '552px',
        display: 'flex',
    },
    marginBottom: {
        marginBottom: '10px'
    },
    middleCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '250px;'
    },
    chip: {
        marginRight: '4px',
        marginBottom: '4px',
    }
}));

const GroupInfo = (props) => {
    const classes = useStyles();
    const data = props.data;
    return (
        <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
            <div className="dialog-wrap" style={{ height: '550px', width: '600px' }}>
                <div className='dialog-header'>
                    <div className='dialog-header-icon'><GroupAddIcon style={{ fontSize: '44px' }} /></div>
                    &nbsp;
                    <span>그룹 정보</span>
                </div>
                <DialogContent>
                    <div className={classes.content}>
                        <div style={{ display:'flex', flexDirection: 'column', justifyContent:'center' ,padding:'20px' }}>
                            <img style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '50%'}} alt="profile-img" src={data.group.group_pic} />
                        </div>
                        <div style={{ display:'flex', flexDirection: 'column', justifyContent:'center' ,padding:'20px' }}>
                            <TextField
                                className={classes.marginBottom}
                                label="그룹명"
                                name='group_nm'
                                defaultValue={data.group.group_nm}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                className={classes.marginBottom}
                                label="그룹 상태메세지"
                                name='group_ex'
                                multiline={true}
                                rows={4}
                                rowsMax={4}
                                defaultValue={data.group.group_ex}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                label="그룹장"
                                name='group_ex'
                                defaultValue={data.group.group_admin}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>
                    </div>
                    <div >
                        <div>
                            <GroupIcon style={{ fontSize: '20px' }} />
                            &nbsp;
                            <span>그룹 멤버</span>
                        </div>
                        <div style={{ padding: '4px' }}>
                            <Chip
                                avatar={<Avatar alt="Natacha" src="https://material-ui.com/static/images/avatar/1.jpg" />}
                                className={classes.chip}
                                label="그룹장"
                                color="primary"
                                style={{backgroundColor: 'rgba(20, 81, 51, 0.8)'}}
                                clickable
                            // onDelete={handleDelete}
                            />
                            <Chip
                                avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
                                className={classes.chip}
                                label="gadsfasgsadf"
                            // onDelete={handleDelete}
                            />
                            <Chip
                                avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
                                className={classes.chip}
                                label="홍길동"
                            // onDelete={handleDelete}
                            />
                            <Chip
                                avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
                                className={classes.chip}
                                label="asdf"
                            // onDelete={handleDelete}
                            />
                            <Chip
                                avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
                                className={classes.chip}
                                label="gsdafasfsdg"
                            // onDelete={handleDelete}
                            />
                            <Chip
                                avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
                                className={classes.chip}
                                label="sf"
                            // onDelete={handleDelete}
                            />
                            <Chip
                                avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
                                className={classes.chip}
                                label="gdsaf"
                            // onDelete={handleDelete}
                            />
                        </div>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
}

export default GroupInfo;
