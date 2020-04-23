import React from 'react';
import { styled } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import ReactCrop from 'react-image-crop';
// import AlertDialog from './AlertDialog';
import ImageEditor from '../Other/ImageEditor';
import 'react-image-crop/dist/ReactCrop.css';
import './ProfileEditor.css';
import AlertDialog from '../Other/AlertDialog';

import axios from 'axios';

class ProfileEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // image : null,
      imageSrc: null,
      // crop: {
      //     unit: '%',
      //     width: 30,
      //     aspect: 1 / 1,
      // },
      // completeCrop : null,
      alert: () => {},
      user_id: props.data.userId,
      user_ex: props.data.userEx,
      user_pic: 'http://placehold.it/250x250',
    };
  }

  changeHandel = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // getCroppedImg = () => {
  //     const crop = this.state.completeCrop;
  //     const image = this.state.image;
  //     const canvas = document.createElement('canvas');
  //     const scaleX = image.naturalWidth / image.width;
  //     const scaleY = image.naturalHeight / image.height;
  //     canvas.width = crop.width;
  //     canvas.height = crop.height;
  //     const ctx = canvas.getContext('2d');

  //     ctx.drawImage(
  //         image,
  //         crop.x * scaleX,
  //         crop.y * scaleY,
  //         crop.width * scaleX,
  //         crop.height * scaleY,
  //         0,
  //         0,
  //         crop.width,
  //         crop.height,
  //     );

  //     // As Base64 string
  //     const base64Image = canvas.toDataURL('image/jpeg');

  //     this.setState({user_pic : base64Image, imageSrc : null, completeCrop : null});
  // }

  render() {
    return (
      <Dialog open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}>
        <div className='dialog-wrap'>
          <div className='dialog-header'>
            <div className='dialog-header-icon'>
              <EditIcon style={{ fontSize: '40px', color: 'white' }} />
            </div>
            &nbsp;
            <span style={{ color: 'white', fontSize: '25px' }}>프로필 수정</span>
          </div>

          <div className='profile-editor'>
            <div className='profile-editor-image'>
              <img
                style={{
                  width: '250px',
                  height: '250px',
                  objectFit: 'cover',
                }}
                alt='profile-img'
                src={this.state.user_pic}
              />
              <EditorButton onClick={() => this.fileUpload.click()}>
                <CloudUploadIcon />
                &nbsp; Upload
              </EditorButton>
              <input
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                ref={(fileUpload) => {
                  this.fileUpload = fileUpload;
                }}
                onChange={(e) => {
                  // console.log(e.target.files);
                  if (e.target.files && e.target.files.length > 0) {
                    const reader = new FileReader();
                    reader.addEventListener('load', () =>
                      this.setState({
                        imageSrc: reader.result,
                      })
                    );
                    reader.readAsDataURL(e.target.files[0]);
                    e.target.value = null;
                  }
                }}
              />
            </div>
            <div className='profile-editor-info'>
              <TextField
                name='user_ex'
                disabled
                label='아이디'
                style={{
                  width: '250px',
                  fontSize: '30px',
                  marginBottom: '10px',
                }}
                defaultValue={this.state.user_id}
              />
              <TextField
                name='user_ex'
                autoFocus
                label='상태메세지'
                multiline
                rowsMax={4}
                style={{
                  width: '250px',
                  fontSize: '30px',
                  marginBottom: '70px',
                }}
                defaultValue={this.state.user_ex}
                onChange={this.changeHandel}
              />
              <EditorButton
                color='secondary'
                onClick={async () => {
                  var canvas = document.createElement('canvas');
                  var ctx = canvas.getContext('2d');

                  const cut = new Image();
                  cut.src = this.state.user_pic;
                  let height = cut.height;
                  let width = cut.width;
                  height *= 250 / width;
                  width = 250;
                  canvas.width = width;
                  canvas.height = height;
                  // canvas에 변경된 크기의 이미지를 다시 그려줍니다.
                  ctx.drawImage(cut, 0, 0, width, height);
                  // canvas 에 있는 이미지를 img 태그로 넣어줍니다
                  var dataurl = canvas.toDataURL('image/jpg');
                  this.setState({ user_pic: dataurl });

                  try {
                    const { data } = await axios.put(`user/${this.state.user_id}`, {
                      userPw: null,
                      userNm: this.props.data.userNm,
                      userEx: this.state.user_ex,
                    });
                    if (data === this.state.user_id) {
                      this.setState({
                        alert: () => {
                          return (
                            <AlertDialog
                              severity='success'
                              content='회원정보가 수정되었습니다.'
                              onAlertClose={() => {
                                this.setState({
                                  alert: () => {},
                                });
                                this.props.onCancel();
                              }}
                            />
                          );
                        },
                      });
                    }
                  } catch (error) {
                    console.error(error);
                    this.setState({
                      alertDialog: () => {
                        return (
                          <AlertDialog
                            severity='error'
                            content='서버 오류로인해 로그인에 실패하였습니다.'
                            onAlertClose={() => {
                              this.setState({ alert: () => {} });
                            }}
                          />
                        );
                      },
                    });
                  }
                }}
              >
                수정
              </EditorButton>
              <EditorButton onClick={() => this.props.onCancel()}>취소</EditorButton>
            </div>
            {this.state.imageSrc && (
              <ImageEditor
                src={this.state.imageSrc}
                onClose={() => this.setState({ imageSrc: null })}
                onComplete={(src) => this.setState({ imageSrc: null, user_pic: src })}
              />
            )}
          </div>
        </div>
        {this.state.alert()}
      </Dialog>
    );
  }
}

const EditorButton = styled(Button)({
  width: '250px',
  height: '50px',
  fontSize: '16px',
});

export default ProfileEditor;
