import React from 'react';
import './UserEditor.css'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core';

class UserEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userImage: "http://placehold.it/250x250",
            userName: '홍길동',
            userId: 'hong-gildong',
        }
    }
    render() {
        return (
            <Dialog open style={{ backgroundColor: 'RGB(255, 223, 75, 0.5)' }}>
                <div className="editor">
                    <div className='editor-image'>
                        <img alt="user img" src={this.state.userImage} />
                    </div>
                    <div className="editor-info">
                        <div className="editor-info-text">
                            <TextField disabled label="이름" defaultValue={this.state.userName} />
                            <TextField disabled label="아이디" defaultValue={this.state.userId} />
                            <TextField required label="패스워드" />
                            <TextField required label="패스워드 확인" />
                        </div>
                        <div className="editor-info-buttons">
                                <EditorButton color="secondary">회원정보 삭제</EditorButton>
                                <EditorButton>수정</EditorButton>
                                <EditorButton onClick={()=>this.props.onCancel()}>취소</EditorButton>
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
}

const EditorButton = styled(Button)({
    width: '80px',
    height: '50px',
    fontSize : '12px'
});

export default UserEditor;