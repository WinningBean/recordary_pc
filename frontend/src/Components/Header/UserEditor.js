import React from 'react';
import './UserEditor.css'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core';
import axios from 'axios';

class UserEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userImage: "http://placehold.it/250x250",
            userName: '홍길동',
            userId: 'hong-gildong',
            user_nm: '',
            user_id: '',
            user_pw: '',
            user_pw_check: '',
            isSamePw: false,
        }
    }

    changeHandel = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const alertLabel = (()=>{
            if(this.state.isSamePw === true){
                return <span style={{color: '#2ecc71'}}>비밀번호가 같습니다.</span>
            }else if(this.state.isSamePw === false){
                return <span style={{color: '#e74c3c'}}>비밀번호가 다릅니다.</span>
            }
            return null;
        })();
        return (
            <Dialog open style={{ backgroundColor: 'RGB(255, 223, 75, 0.5)' }}>
                <div className="editor">
                    <div className='editor-image'>
                        <img alt="user img" src={this.state.userImage} />
                    </div>
                    <div className="editor-info">
                        <div className="editor-info-text">
                            <TextField name="user_nm" disabled label="이름" defaultValue={this.state.userName} onChange={this.changeHandel} />
                            <TextField name="user_id" disabled label="아이디" defaultValue={this.state.userId} onChange={this.changeHandel} />
                            <TextField name="user_pw" type="password" required label="패스워드" 
                            onChange={
                                (e)=>{
                                    this.changeHandel(e);
                                    if(e.target.value === "" || this.state.user_pw_check === ""){
                                        this.setState({isSamePw : false});
                                        return;
                                    }
                                    if(this.state.user_pw_check === e.target.value){
                                        this.setState({isSamePw : true});
                                        console.log('aa');
                                        return;
                                    }
                                    this.setState({isSamePw : false});
                                }
                                } />
                            <TextField name="user_pw_check" type="password" required label="패스워드 확인" 
                            onChange={
                                (e)=>{
                                    this.changeHandel(e);
                                    if(e.target.value === "" || this.state.user_pw === ""){
                                        this.setState({isSamePw : false});
                                        return;
                                    }
                                    if(this.state.user_pw === e.target.value){
                                        this.setState({isSamePw : true});
                                        console.log('aa');
                                        return;
                                    }
                                    this.setState({isSamePw : false});
                                }
                            } />
                            {alertLabel}
                        </div>
                        <div className="editor-info-buttons">
                                <EditorButton disabled={!this.state.isSamePw} color="secondary" onClick={async ()=>{
                                    try {
                                        const form = new FormData();
                                        form.append("user_id", this.state.user_id);
                                        await axios.post("url", form);
                                    }catch(error){
                                        console.error(error);
                                    }
                                }}>회원정보 삭제</EditorButton>
                                <EditorButton disabled={!this.state.isSamePw} onClick={async ()=>{
                                    try {
                                        const form = new FormData();
                                        form.append("user_id", this.state.user_id);
                                        form.append("user_pw", this.state.user_pw);
                                        form.append("user_nm", this.state.user_nm);
                                        await axios.post("url", form);
                                    }catch(error){
                                        console.error(error);
                                    }
                                }}>수정</EditorButton>
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