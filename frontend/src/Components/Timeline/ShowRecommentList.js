import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import produce from 'immer';

import './Timeline.css';

import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import CheckIcon from '@material-ui/icons/Check';
import AlertDialog from '../Other/AlertDialog';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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

export default ({ list, user, onSuccess }) => {
  useEffect(() => {
    console.log(list);
    setData(
      list.map((value) => ({
        ...value,
        updateClick: false,
        deleteClick: false,
      }))
    );
  }, [list]);

  const [dialog, setDialog] = useState(null);
  const [writeRecomment, setWriteRecomment] = useState('');
  const [updateRecomment, setUpdateRecomment] = useState('');

  const [data, setData] = useState(
    list.map((value) => ({
      ...value,
      updateClick: false,
      deleteClick: false,
    }))
  );

  const textField = useRef();

  return data.map((val, i) => (
    <div key={`${val.commentCd}-${i}`}>
      <div className='comment-reply-users more-recomment-reply-users'>
        <div className='recomment-reply-users-img'>
          <img alt={`${val.userFK.userCd} img`} src={val.userFK.userPic} />
        </div>
        <div className='comment-reply-users-name'>
          <span style={{ fontWeight: 'bold', fontSize: '12px', marginRight: '5px' }}>
            {val.userFK.userId}({val.userFK.userNm})
          </span>
          <span style={{ fontSize: '12px' }}>
            <InputBase
              style={{ fontSize: '12px', height: '12px', color: 'black' }}
              defaultValue={val.commentContent}
              inputProps={{ 'aria-label': 'naked' }}
              disabled={val.updateClick === true ? false : true}
              onChange={(e) => setUpdateRecomment(e.target.value)}
            />
          </span>
        </div>
        <div className='commentIcon-hover' style={{ height: ' 15px' }}>
          {user.userCd !== val.userFK.userCd ? null : (
            <div>
              {val.updateClick === true ? (
                <CheckIcon
                  onClick={async () => {
                    try {
                      const editedCommentCd = (
                        await axios.put(`/comment/${val.commentCd}`, updateRecomment, {
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
                        if (i === listIndex) {
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
                          if (i === listIndex) {
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
                          if (i === listIndex) {
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
      <Dialog
        open={val.deleteClick}
        onClose={() =>
          setData(
            data.map((val, listIndex) => {
              if (i === listIndex) {
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
                  if (i === listIndex) {
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
                const recommentDeletedCd = (await axios.delete(`/comment/${val.commentCd}`)).data;
                console.log(recommentDeletedCd);
                setDialog(
                  <AlertDialog
                    severity='success'
                    content='댓글을 삭제하였습니다.'
                    onAlertClose={() => setDialog(null)}
                  />
                );
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
                  if (i === listIndex) {
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
