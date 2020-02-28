import React, { useState, useEffect } from 'react';
import './group.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

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
    const [info, setInfo] = useState(null);

    // useEffect( async ()=>{
    //     // 그룹 대표사진 250x250 img, 유저 리스트, 유저 40x40 img
    //     const info = (await axios.post('/group/info',{params:{group_cd:data.group.group_cd}})).data;
    // });

    return (
        <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
            <div className="dialog-wrap" style={{ height: '550px', width: '600px' }}>
                <div className='dialog-header'>
                    <div className='dialog-header-icon'><GroupAddIcon style={{ fontSize: '44px' }} /></div>
                    &nbsp;
                    <span>그룹 정보</span>
                    <div className='dialog-header-icon' style={{position: 'absolute', right: '5px'}}>
                        <IconButton onClick={()=>props.onClose()} >
                            <CloseIcon style={{color:'#ffffff', fontSize: '20px'}}/>
                        </IconButton>
                    </div>
                </div>
                <DialogContent>
                    <div className={classes.content}>
                        <div style={{ display:'flex', flexDirection: 'column', width: '250px', height: '250px', alignItems:'center', justifyContent:'center' }}>
                            {info === null ? 
                            <CircularProgress /> : 
                            <img style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '50%'}} alt="profile-img" src={info.group_pic} />}
                        </div>
                        <div style={{ display:'flex', flexDirection: 'column',width: '250px', height: '250px', justifyContent:'center' ,padding:'20px' }}>
                            <TextField
                                className={classes.marginBottom}
                                label="그룹명"
                                name='group_nm'
                                defaultValue={data.group.group_nm}
                                InputProps={{
                                    readOnly: true,
                                }}
                                onClick={()=>setInfo({group_pic:'http://placehold.it/250x250'})}
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
                        {info === null ? 
                        (<div style={{ display:'flex' , justifyContent:'center', alignItems:'center', padding: '4px', minHeight: '180px'}}>
                            <CircularProgress />
                        </div>)
                        :(
                            <div style={{ padding: '4px', minHeight: '180px'}}>
                            <Chip
                                avatar={<Avatar alt="Natacha" src="https://material-ui.com/static/images/avatar/1.jpg" />}
                                className={classes.chip}
                                label="그룹장"
                                color="primary"
                                style={{backgroundColor: 'rgba(20, 81, 51, 0.8)'}}
                                clickable
                            />
                            <Chip
                                avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
                                className={classes.chip}
                                label="gadsfasgsadf"
                            />
                            <Chip
                                avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
                                className={classes.chip}
                                label="홍길동"
                            />
                            <Chip
                                avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
                                className={classes.chip}
                                label="asdf"
                            />
                            <Chip
                                avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
                                className={classes.chip}
                                label="gsdafasfsdg"
                            />
                            <Chip
                                avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
                                className={classes.chip}
                                label="sf"
                            />
                            <Chip
                                avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
                                className={classes.chip}
                                label="gdsaf"
                            />
                        </div>   
                        )}
                        
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
}

export default GroupInfo;
