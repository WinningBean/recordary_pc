import React, { useState } from 'react';
import './group.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import ImageEditor from 'Components/Other/ImageEditor';
import AlertDialog from 'Components/Other/AlertDialog';
import Snackbar from 'Components/UI/Snackbar';
import Backdrop from 'Components/UI/Backdrop';
import axios from 'axios';

const GroupAdd = (props) => {
    const [openSwitch, setOpenSwitch] = useState({
        open: true
    });

    const [group, setGroup] = useState({
        group_nm: '',
        group_ex: '',
        group_pic: '',
    });
    const [imageSrc, setImageSrc] = useState(null);
    const [alert, setAlert] = useState(null);

    let fileUpload = null;

    const changeHandel = (e) => {
        setGroup({
            ...group,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async () => {
        setAlert(
            // <Snackbar 
            //         severity='info'
            //         content='Loading...'
            //         onClose={()=>setAlert(null)}
            //     />
            <Backdrop />
        )
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        const cut = new Image();
        cut.src = group.group_pic;
        let height = cut.height;
        let width = cut.width;
        height *= 250 / width;
        width = 250;
        canvas.width = width;
        canvas.height = height;
        // canvas에 변경된 크기의 이미지를 다시 그려줍니다.
        ctx.drawImage(cut, 0, 0, width, height);
        // canvas 에 있는 이미지를 img 태그로 넣어줍니다
        var dataUrl = canvas.toDataURL("image/jpg");

        
        try {
            // const form = new FormData();
            // form.append('group_nm', group.group_nm);
            // form.append('group_ex', group.group_ex);
            // form.append('group_pic', dataUrl);
            // const { data } = await axios.post("http://localhost:8888/createGroup", form);

            const data = { success : true };

            if (data.success) {
                props.onAdd(group);
                setAlert(
                    <AlertDialog
                        severity='success'
                        content='그룹을 생성하였습니다.'
                        onAlertClose={() => setAlert(null)}
                    />
                )
            }else{
                setAlert(
                    <Snackbar 
                    severity='error'
                    content='그룹 생성에 실패하였습니다.'
                    onClose={()=>setAlert(null)}
                />
                )
            }
        } catch (error) {
            setAlert(
                <Snackbar 
                    severity='error'
                    content='서버 에러로 그룹 생성에 실패하였습니다.'
                    onClose={()=>setAlert(null)}
                />
            )
        }
    }

    return (
        <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
            <div className="dialog-wrap">
                <div className='dialog-header'>
                    <div className='dialog-header-icon'><GroupAddIcon style={{ fontSize: '44px' }} /></div>
                    &nbsp;
                    <span>그룹 생성</span>
                </div>
                <DialogContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="dialog-content">
                        <div>
                            <img style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '50%' }} alt="profile-img" src={group.group_pic} />
                        </div>
                        <Button
                            startIcon={<CloudUploadIcon />}
                            variant="outlined"
                            onClick={() => fileUpload.click()}
                        // onClick={()=>{
                        //     setImageEditor(
                        //         <ImageEditor
                        //             src={user.user_pic}
                        //             onClose={() => this.setState({ imageSrc: null })}
                        //             onComplete={(src) => this.setState({ imageSrc: null, user_pic: src })}
                        //         />
                        //     )
                        // }}
                        >&nbsp;Upload</Button>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={(file) => {
                            fileUpload = file;
                        }}
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                const reader = new FileReader();
                                reader.addEventListener('load', () =>
                                    setImageSrc(reader.result)
                                );
                                reader.readAsDataURL(e.target.files[0]);
                                e.target.value = null;
                            }
                        }} />
                    <div className="dialog-content">
                        <TextField 
                            label="그룹명"
                            name='group_nm'
                            onChange={changeHandel}
                        />
                        <TextField
                            label="그룹 설명"
                            name='group_ex'
                            multiline={true}
                            rows={10}
                            rowsMax={10}
                            onChange={changeHandel}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Tooltip title="검색시 그룹이 보여집니다." placement="top">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={openSwitch.open}
                                    onChange={event => setOpenSwitch({ open: event.target.checked })}
                                    color="primary"
                                />
                            }
                            label="그룹 공개"
                        />
                    </Tooltip>
                    <Button color="secondary" onClick={() => props.onCancel()}>취소</Button>
                    <Button color="primary" onClick={onSubmit}>생성</Button>
                </DialogActions>
                {imageSrc && (
                    <ImageEditor
                        src={imageSrc}
                        onClose={() => setImageSrc(null)}
                        onComplete={(src) => {
                            setImageSrc(null);
                            setGroup({ ...group, group_pic: src });
                        }}
                    />
                )}
            </div>
            {alert}
        </Dialog>
    );
}

export default GroupAdd;
