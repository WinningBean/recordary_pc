import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';

import axios from 'axios';

import store from '../../store';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textStyle: {
    width: '340px',
    marginLeft: '10px',
  },
}));

const SendButton = styled(Button)({
  minWidth: '30px',
  height: '40px',
});

const CommentTimeline = ({ user, postCd, onSuccess }) => {
  const classes = useStyles();
  const [writeComment, setWriteComment] = useState('');
  const textField = useRef();

  const handleChange = (e) => {
    setWriteComment(e.target.value);
  };

  if (user === undefined) {
    return (
      <FormControl className={classes.margin}>
        <TextField
          inputRef={textField}
          className={(classes.margin, classes.textStyle)}
          disabled={true}
          variant='outlined'
          multiline
          rowsMax='2'
          rows='2'
          defaultValue='로그인이 되어있지않습니다.'
        />
      </FormControl>
    );
  }

  return (
    <FormControl className={classes.margin}>
      <TextField
        inputRef={textField}
        className={(classes.margin, classes.textStyle)}
        id='input-with-icon-textfield'
        label='Comment'
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <AccountCircle />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <SendButton
                onClick={async (e) => {
                  e.preventDefault();
                  textField.current.value = '';
                  try {
                    if (writeComment !== '') {
                      const commentCdData = (
                        await axios.post(`/comment/`, {
                          userCd: user.userCd,
                          postCd: postCd,
                          commentContent: writeComment,
                          commentOriginCd: null,
                          // commentOriginFK => 대댓글 코드 작성 시 수정
                        })
                      ).data;

                      // store.dispatch({
                      //   type: 'SAVE_NOTICE',
                      //   notice: {
                      //     noticeType: 'COMMENT_NEW', // 이벤트 타입
                      //     activeCd: commentCdData, // 이벤트 주체
                      //     targetCd: postCd, // 이벤트 대상
                      //   },
                      // });

                      onSuccess({
                        commentCd: commentCdData,
                        commentContent: writeComment,
                        reCommentCount: 0,
                        userFK: {
                          userCd: user.userCd,
                          userId: user.userId,
                          userNm: user.userNm,
                          userPic: user.userPic,
                        },
                      });
                      console.log(writeComment);
                    } else return null;
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                <SubdirectoryArrowLeftIcon />
              </SendButton>
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
        variant='outlined'
        multiline
        rowsMax='2'
        rows='2'
      ></TextField>
    </FormControl>
  );
};

export default CommentTimeline;
