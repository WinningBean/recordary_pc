import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import produce from 'immer';

import './Timeline.css';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import ShowRecommentList from './ShowRecommentList';
import InputBase from '@material-ui/core/InputBase';
import CheckIcon from '@material-ui/icons/Check';
import AlertDialog from '../Other/AlertDialog';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import CommentIcon from '@material-ui/icons/Comment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';

import store from '../../store';
const useStyles = makeStyles((theme) => ({
  textFieldSize: {
    fontSize: '12px',
    width: '170px',
  },
}));

const SendButton = styled(Button)({
  minWidth: '20px',
  height: '20px',
});

export default ({ postCd, tData, user, onSuccess }) => {
  useEffect(() => {
    setData(
      tData.map((value) => ({
        ...value,
        showRecommentClick: { recommentList: [], click: false },
        updateClick: false,
      }))
    );
  }, [tData]);

  const classes = useStyles();
  const [data, setData] = useState(
    tData.map((value) => ({
      ...value,
      showRecommentClick: { recommentList: [], click: false },
      updateClick: false,
    }))
  );
  const [dialog, setDialog] = useState(null);
  const [writeRecomment, setWriteRecomment] = useState('');
  const [updateComment, setUpdateComment] = useState('');
  const [updateRecomment, setUpdateRecomment] = useState('');
  const [deleteClick, setDeleteClick] = useState(false);

  const textField = useRef();

  const handleChange = (e) => {
    setWriteRecomment(e.target.value);
  };

  const getRecommentList = async (value, index, bool) => {
    try {
      const recommentListData = (await axios.get(`/comment/sub/${value.commentCd}`)).data;
      setData(
        data.map((val, listIndex) => {
          if (index === listIndex) {
            return produce(val, (draft) => {
              draft.showRecommentClick.click = !bool;
              draft.showRecommentClick.recommentList = JSON.parse(JSON.stringify(recommentListData));
            });
          } else {
            return produce(val, (draft) => {
              draft.showRecommentClick.click = draft.showRecommentClick.click;
            });
          }
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return data.map((value, index) => (
    <div key={value.commentCd} style={{ marginBottom: '5px' }}>
      <div className='comment-reply-users'>
        <div className='comment-reply-users-img'>
          <img alt={`${value.userFK.userId} img`} src={value.userFK.userPic} />
        </div>
        <div className='comment-reply-users-name'>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
            <div>
              <span className='reply-name'>
                {value.userFK.userId}({value.userFK.userNm})
              </span>
              <span>
                <InputBase
                  style={
                    value.updateClick === true
                      ? {
                          fontSize: '13px',
                          height: '13px',
                          color: 'black',
                          width: '90%',
                          maxWidth: '150px',
                          // backgroundColor: 'rgba(161, 159, 159, 0.3)',
                        }
                      : { fontSize: '13px', height: '13px', color: 'black', width: '90%', maxWidth: '150px' }
                  }
                  defaultValue={value.commentContent}
                  inputProps={{ 'aria-label': 'naked' }}
                  disabled={value.updateClick === true ? false : true}
                  onChange={(e) => setUpdateComment(e.target.value)}
                />
              </span>
            </div>
            <div className='commentIcon-hover' style={{ height: ' 15px' }}>
              {user === undefined ? null : user.userCd !== value.userFK.userCd ? null : (
                <div>
                  {value.updateClick === true ? (
                    <CheckIcon
                      onClick={async () => {
                        try {
                          console.log(updateComment);
                          const editedCommentCd = (
                            await axios.put(`/comment/${value.commentCd}`, updateComment, {
                              headers: { 'Content-Type': 'application/json' },
                            })
                          ).data;
                          console.log(editedCommentCd);
                        } catch (e) {
                          console.log(e);
                          setDialog(
                            <AlertDialog
                              severity='error'
                              content='댓글을 수정하지 못했습니다.'
                              onAlertClose={() => setDialog(null)}
                            />
                          );
                        }
                        setData(
                          data.map((val, listIndex) => {
                            if (index === listIndex) {
                              return produce(val, (draft) => {
                                draft.updateClick = !draft.updateClick;
                              });
                            } else {
                              return produce(val, (draft) => {
                                draft.updateClick = draft.updateClick;
                              });
                            }
                          })
                        );
                      }}
                      style={{
                        color: 'gray',
                        fontSize: '20',
                        paddingRight: '5px',
                        paddingBottom: '5px',
                      }}
                    />
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <EditIcon
                        onClick={() => {
                          setData(
                            data.map((val, listIndex) => {
                              if (index === listIndex) {
                                return produce(val, (draft) => {
                                  draft.updateClick = !draft.updateClick;
                                });
                              } else {
                                return produce(val, (draft) => {
                                  draft.updateClick = draft.updateClick;
                                });
                              }
                            })
                          );
                        }}
                        style={{
                          color: 'gray',
                          fontSize: '20',
                          paddingRight: '5px',
                          paddingBottom: '5px',
                        }}
                      />
                      <ClearIcon
                        onClick={() => setDeleteClick(true)}
                        style={{
                          color: 'gray',
                          fontSize: '20',
                          paddingRight: '5px',
                          paddingBottom: '5px',
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className='commentIconFlex'>
            <div
              className='show-more-comment'
              onClick={() =>
                user === undefined ? null : getRecommentList(value, index, value.showRecommentClick.click)
              }
            >
              <CommentIcon
                style={
                  value.showRecommentClick.click === true
                    ? {
                        fontSize: '20',
                        paddingRight: '5px',
                        color: 'rgba(20, 81, 51, 0.9)',
                      }
                    : {
                        fontSize: '20',
                        paddingRight: '5px',
                      }
                }
              />
              {value.reCommentCount > 0 ? (
                value.showRecommentClick.click === false ? (
                  <span style={{ fontSize: '12px' }}>{`댓글 ${
                    value.showRecommentClick.recommentList.length > 0
                      ? value.showRecommentClick.recommentList.length
                      : value.reCommentCount
                  }개 모두 보기`}</span>
                ) : (
                  <span style={{ fontSize: '12px' }}>{`댓글 접기`}</span>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {value.showRecommentClick.click === true ? (
        <>
          <ShowRecommentList
            list={value.showRecommentClick.recommentList}
            user={user}
            onSuccess={(commentInfo) => {
              console.log(commentInfo);
              setData(
                data.map((val, listIndex) => {
                  if (index === listIndex) {
                    return produce(val, (draft) => {
                      draft.showRecommentClick.click = true;
                      draft.showRecommentClick.recommentList = commentInfo;
                    });
                  } else {
                    return produce(val, (draft) => {
                      draft.showRecommentClick.click = draft.showRecommentClick.click;
                    });
                  }
                })
              );
            }}
          />
          <div className='show-recomment-write' style={{ marginBottom: '5px' }}>
            <TextField
              inputRef={textField}
              id='recommentWrite'
              autoFocus={true}
              multiline
              rowsMax='2'
              onChange={handleChange}
              InputProps={{
                classes: {
                  input: classes.textFieldSize,
                },
                startAdornment: (
                  <InputAdornment position='start'>
                    <div className='recommentProfileImg'>
                      <img alt={`${user.userId} img`} src={user.userPic} />
                    </div>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <SendButton
                      onClick={async (e) => {
                        e.preventDefault();
                        textField.current.value = '';
                        try {
                          const recommentCd = (
                            await axios.post(`/comment/`, {
                              userCd: user.userCd,
                              postCd: postCd,
                              commentContent: writeRecomment,
                              commentOriginCd: value.commentCd,
                            })
                          ).data;
                          store.dispatch({
                            type: 'SAVE_NOTICE',
                            notice: {
                              noticeType: 'COMMENT_SUB_NEW', // 이벤트 타입
                              activeCd: recommentCd, // 이벤트 주체
                              targetCd: value.commentCd, // 이벤트 대상
                            },
                          });
                          getRecommentList(value, index, false);
                          console.log(recommentCd);
                        } catch (e) {
                          console.log(e + 'comment Error');
                          setDialog(
                            <AlertDialog
                              severity='error'
                              content='서버에러로 댓글입력에 실패하였습니다.'
                              onAlertClose={() => setDialog(null)}
                            />
                          );
                        }
                      }}
                    >
                      <SubdirectoryArrowLeftIcon style={{ fontSize: '15px' }} />
                    </SendButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </>
      ) : null}
      <Dialog
        open={deleteClick}
        onClose={() => setDeleteClick(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>댓글 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>댓글을 삭제하시겠습니까?</DialogContentText>
          <DialogContentText style={{ color: 'red', fontSize: '12px' }}>
            *관련된 댓글도 모두 삭제됩니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteClick(false)} color='primary'>
            취소
          </Button>
          <Button
            onClick={async () => {
              try {
                const commentDeleted = (await axios.delete(`/comment/${value.commentCd}`)).data;
                if (commentDeleted) {
                  const copyList = data.slice();
                  copyList.splice(index, 1);
                  setData(copyList);
                  onSuccess(copyList);
                  setDialog(
                    <AlertDialog
                      severity='success'
                      content='댓글을 삭제하였습니다.'
                      onAlertClose={() => setDialog(null)}
                    />
                  );
                }
              } catch (e) {
                console.log(e);
                setDialog(
                  <AlertDialog
                    severity='error'
                    content='서버에러로 댓글삭제를 실패하였습니다.'
                    onAlertClose={() => setDialog(null)}
                  />
                );
              }
              setDeleteClick(false);
            }}
            color='primary'
            autoFocus
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ));
};
