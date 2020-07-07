import React, { useState, useEffect } from 'react';
import Snackbar from '../UI/Snackbar';
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
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '552px',
    display: 'flex',
    justifyContent: 'center',
  },
  marginBottom: {
    marginBottom: '10px',
  },
  middleCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '250px;',
  },
  chip: {
    marginRight: '4px',
    marginBottom: '4px',
  },
}));
// data : {
//   user_id: data.currentUser.user_id,
//   group: value,
// }
const GroupInfo = ({ data, onClose }) => {
  const classes = useStyles();
  const [info, setInfo] = useState(undefined);
  // groupCd: 10
  // userCd: 10
  // groupName: "abcd"
  // groupState: true
  // groupEx: "abcd"
  // groupPic: "https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/group/basic.png"
  // userPic: "https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/user/basic.png"
  // userId: "wsh"
  // userName: "wsh"

  useEffect(() => {
    // 그룹 대표사진 250x250 img, 유저 리스트, 유저 40x40 img
    (async () => {
      try {
        const groupInfo = (await axios.get('/group/', { params: { input: data.group.groupCd } })).data;
        console.log(groupInfo);
        const groupMember = (await axios.get(`/group/member/${data.group.groupCd}`)).data;
        console.log(groupMember);
        setInfo({ ...groupInfo, groupMember: groupMember });
      } catch (e) {
        console.error(e);
        setInfo(null);
      }
    })();
  }, []);

  if (info === undefined) {
    return <Snackbar onClose={() => onClose()} severity='success' content='데이터 요청중...' />;
  } else if (info === null) {
    return (
      <Snackbar onClose={() => onClose()} severity='error' content='서버에러로 인하여 데이터 요청에 실패하였습니다.' />
    );
  }
  return (
    <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
      <div className='dialog-wrap' style={{ height: '550px', width: '600px' }}>
        <div className='dialog-header'>
          <div className='dialog-header-icon'>
            <GroupAddIcon style={{ fontSize: '44px' }} />
          </div>
          &nbsp;
          <span>그룹 정보</span>
          <div className='dialog-header-icon' style={{ position: 'absolute', right: '5px' }}>
            <IconButton onClick={() => onClose()}>
              <CloseIcon style={{ color: '#ffffff', fontSize: '20px' }} />
            </IconButton>
          </div>
        </div>
        <DialogContent>
          <div className={classes.content}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '250px',
                height: '250px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                style={{
                  width: '250px',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
                alt='profile-img'
                src={info.groupPic}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '250px',
                height: '250px',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              <TextField
                className={classes.marginBottom}
                label='그룹명'
                name='group_nm'
                defaultValue={info.groupNm}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                className={classes.marginBottom}
                label='그룹 상태메세지'
                name='group_ex'
                multiline={true}
                rows={4}
                rowsMax={4}
                defaultValue={info.groupEx}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label='그룹장'
                name='group_ex'
                defaultValue={info.admin.userNm}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </div>
          <div>
            <div>
              <GroupIcon style={{ fontSize: '20px' }} />
              &nbsp;
              <span>그룹 멤버</span>
            </div>
            <div style={{ padding: '4px', minHeight: '180px' }}>
              <Link to={`/profile/${info.userCd}`}>
                <Chip
                  avatar={<Avatar alt={`${info.userNm} img`} src={info.userPic} />}
                  className={classes.chip}
                  label={info.userNm}
                  style={{
                    backgroundColor: 'rgba(20, 81, 51, 0.8)',
                    color: '#ffffff',
                  }}
                  clickable
                />
              </Link>
              {(() => {
                return info.groupMember.map((value) => {
                  return (
                    <Link key={`member-${value.userCd}`} to={`/${value.userId}`}>
                      <Chip
                        avatar={<Avatar alt={`${value.userNm} img`} src={value.userPic} />}
                        className={classes.chip}
                        label={value.userNm}
                        clickable
                      />
                    </Link>
                  );
                });
              })()}
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default GroupInfo;

// <Chip
//                                 avatar={<Avatar alt="Natacha" src="https://material-ui.com/static/images/avatar/1.jpg" />}
//                                 className={classes.chip}
//                                 label="그룹장"
//                                 color="primary"
//                                 style={{backgroundColor: 'rgba(20, 81, 51, 0.8)'}}
//                                 clickable
//                             />
//                             <Chip
//                                 avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
//                                 className={classes.chip}
//                                 label="gadsfasgsadf"
//                             />
//                             <Chip
//                                 avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
//                                 className={classes.chip}
//                                 label="홍길동"
//                             />
//                             <Chip
//                                 avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
//                                 className={classes.chip}
//                                 label="asdf"
//                             />
//                             <Chip
//                                 avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
//                                 className={classes.chip}
//                                 label="gsdafasfsdg"
//                             />
//                             <Chip
//                                 avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
//                                 className={classes.chip}
//                                 label="sf"
//                             />
//                             <Chip
//                                 avatar={<Avatar alt="Natacha" src="http://placehold.it/40x40" />}
//                                 className={classes.chip}
//                                 label="gdsaf"
//                             />
