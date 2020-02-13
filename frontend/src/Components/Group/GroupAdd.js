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

const GroupAdd = (props) => {
    const [openSwitch, setOpenSwitch] = useState({
        open: true
    });
    const [user, setUser] = useState({
        user_id: 'aa',
        user_pic: 'http://placehold.it/250x250'
    });
    const [imageSrc, setImageSrc] = useState(null);
    let fileUpload = null;
    
    return (
        <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
            <div className="dialog-wrap">
                <div className='dialog-header'>
                    <div className='dialog-header-icon'><GroupAddIcon style={{ fontSize: '44px' }} /></div>
                    &nbsp;
                    <span>그룹 생성</span>
                </div>
                <DialogContent style={{display:'flex', justifyContent:'space-between'}}>
                    <div className="dialog-content">
                        <div>
                            <img style={{width:'250px', height:'250px', objectFit:'cover'}} alt="profile-img" src={user.user_pic} />
                        </div>
                        <Button 
                            startIcon={<CloudUploadIcon/>} 
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
                                    setImageSrc( reader.result )
                                );
                                reader.readAsDataURL(e.target.files[0]);
                                e.target.value = null;
                            }
                        }} />
                    <div className="dialog-content">
                        <TextField label="그룹명" />
                        <TextField
                            label="그룹 설명"
                            multiline={true}
                            rows={10}
                            rowsMax={10}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                        <Tooltip title="검색시 그룹이 보여집니다.">
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
                    <Button color="primary" onClick={() => props.onCancel()}>생성</Button>
                </DialogActions>
                {imageSrc && (
                    <ImageEditor 
                    src={imageSrc} 
                    onClose={()=>setImageSrc(null)}
                    onComplete={(src)=>{
                        setImageSrc(null);
                        setUser({...user, user_pic : src});
                    }}
                    />
                )}
            </div>
        </Dialog>
    );
}

export default GroupAdd;
