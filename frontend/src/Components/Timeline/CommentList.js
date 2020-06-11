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

export default ({ tData, user }) => {
  // console.log(tData);
  const classes = useStyles();
  const [data, setData] = useState(
    tData.map((value) => ({
      ...value,
      showRecommentClick: { recommentList: [], click: false },
      updateClick: false,
      deleteClick: false,
      reIconClick: false,
    }))
  );
  const [dialog, setDialog] = useState(null);
  const [writeRecomment, setWriteRecomment] = useState('');
  const [updateComment, setUpdateComment] = useState('');
  const [updateRecomment, setUpdateRecomment] = useState('');

  const textField = useRef();

  const handleChange = (e) => {
    setWriteRecomment(e.target.value);
  };

  const getRecommentList = async (value, index) => {
    try {
      const recommentListData = (await axios.get(`/comment/${value.commentCd}`)).data;
      setData(
        data.map((val, listIndex) => {
          if (index === listIndex) {
            return produce(val, (draft) => {
              draft.showRecommentClick.click = !draft.showRecommentClick.click;
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
                          // backgroundColor: 'rgba(161, 159, 159, 0.3)',
                        }
                      : { fontSize: '13px', height: '13px', color: 'black' }
                  }
                  defaultValue={value.commentContent}
                  inputProps={{ 'aria-label': 'naked' }}
                  disabled={value.updateClick === true ? false : true}
                  onChange={(e) => setUpdateComment(e.target.value)}
                />
              </span>
            </div>
            <div className='commentIcon-hover' style={{ height: ' 15px' }}>
              {user.userCd !== value.userFK.userCd ? null : (
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
                        onClick={() => {
                          setData(
                            data.map((val, listIndex) => {
                              if (index === listIndex) {
                                return produce(val, (draft) => {
                                  draft.deleteClick = !draft.deleteClick;
                                });
                              } else {
                                return produce(val, (draft) => {
                                  draft.deleteClick = draft.deleteClick;
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
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className='commentIconFlex'>
            <div
              className='commentIcon-hover'
              onClick={() => {
                setData(
                  data.map((val, listIndex) => {
                    if (index === listIndex) {
                      return produce(val, (draft) => {
                        draft.reIconClick = !draft.reIconClick;
                      });
                    } else {
                      return produce(val, (draft) => {
                        draft.reIconClick = draft.reIconClick;
                      });
                    }
                  })
                );
              }}
            >
              <CommentIcon
                style={
                  value.reIconClick === true
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
            </div>
            {value.reCommentCount > 0 ? (
              <>
                <div className='show-more-comment' onClick={() => getRecommentList(value, index)}>
                  <div>
                    <MoreHorizIcon
                      style={{
                        fontSize: '15',
                        paddingTop: '3px',
                      }}
                    />
                    {value.showRecommentClick.click === false ? (
                      <span style={{ fontSize: '12px' }}>{`댓글 ${value.reCommentCount}개 모두 보기`}</span>
                    ) : (
                      <span style={{ fontSize: '12px' }}>{`댓글 접기`}</span>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      {value.showRecommentClick.click === true ? (
        <ShowRecommentList list={value.showRecommentClick.recommentList} user={user} />
      ) : null}
      {value.reIconClick === true ? (
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
                            postCd: data.postCd,
                            commentContent: writeRecomment,
                            commentOriginCd: value.commentCd,
                          })
                        ).data;
                        console.log(recommentCd);
                      } catch (e) {
                        console.log(e + 'comment Error');
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
      ) : null}
      <Dialog
        open={value.deleteClick}
        onClose={() =>
          setData(
            data.map((val, listIndex) => {
              if (index === listIndex) {
                return produce(val, (draft) => {
                  draft.deleteClick = !draft.deleteClick;
                });
              } else {
                return produce(val, (draft) => {
                  draft.deleteClick = draft.deleteClick;
                });
              }
            })
          )
        }
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>댓글 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>댓글을 삭제하시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setData(
                data.map((val, listIndex) => {
                  if (index === listIndex) {
                    return produce(val, (draft) => {
                      draft.deleteClick = !draft.deleteClick;
                    });
                  } else {
                    return produce(val, (draft) => {
                      draft.deleteClick = draft.deleteClick;
                    });
                  }
                })
              )
            }
            color='primary'
          >
            취소
          </Button>
          <Button
            onClick={async () => {
              try {
                const commentDeletedCd = (await axios.delete(`/comment/${value.commentCd}`)).data;
                console.log(commentDeletedCd);
                if (commentDeletedCd) {
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
              setData(
                data.map((val, listIndex) => {
                  if (index === listIndex) {
                    return produce(val, (draft) => {
                      draft.deleteClick = !draft.deleteClick;
                    });
                  } else {
                    return produce(val, (draft) => {
                      draft.deleteClick = draft.deleteClick;
                    });
                  }
                })
              );
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
