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

const CommentTimeline = (props) => {
  const classes = useStyles();
  const [writeComment, setWriteComment] = useState('');
  const textField = useRef();

  const handleChange = (e) => {
    setWriteComment(e.target.value);
  };

  return (
    <div>
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
                        const commentCd = (
                          await axios.post(`/comment/`, {
                            userCd: props.user.userCd,
                            postCd: props.postCd,
                            commentContent: writeComment,
                            commentOriginCd: null,
                            // commentOriginFK => 대댓글 코드 작성 시 수정
                          })
                        ).data;
                        console.log(writeComment);
                      } else return null;
                    } catch (e) {
                      console.log(e + 'comment Error');
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
    </div>
  );
};

export default CommentTimeline;
