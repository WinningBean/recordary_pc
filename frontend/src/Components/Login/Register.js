import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import axios from 'axios';

class Register extends React.Component {
    state = {
        user_nm : "",
        user_id: "",
        user_pw: "",
        alert : ()=>{},
    }
    changeHandel = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <Dialog open fullWidth>
                <DialogTitle>회원가입</DialogTitle>
                <form method="POST" onSubmit={async (e) => {
                    e.preventDefault();
                    console.log(this.state);
                    try{
                        const form = new FormData();
                        form.append('user_nm', this.state.user_nm);
                        form.append('user_id', this.state.user_id);
                        form.append('user_pw', this.state.user_pw);
                        const { data } = await axios.post("http://localhost:8888/joinRequest", form);
                        if(data.isPossibleId === false){
                            this.setState({alert : () => {
                                return (<Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                이미 존재하는 아이디입니다.
                            </Alert>)
                            }})
                            return;
                        }
                        if(data.isJoin === false){
                            this.setState({alert : () => {
                                return (<Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                회원가입에 실패하였습니다. 다시 한번 시도해주세요.
                            </Alert>)
                            }})
                            return;
                        }
                        
                        this.props.onSuccessRegister();
                    }catch(error){
                        console.error(error);
                    }
                }}>
                    <div className="register-text" style={{position:'relative', paddingLeft:"100px"}}>
                        <TextField
                            name="user_nm"
                            autoFocus
                            label="이름"
                            onChange={this.changeHandel} /><br />
                        <TextField
                            name="user_id"
                            label="아이디"
                            onChange={this.changeHandel} /><br />
                        <TextField
                            name="user_pw"
                            type="password"
                            label="비밀번호"
                            onChange={this.changeHandel} /><br />
                            <div className="register-alert" style={{position:'absolute', right:'40px', top:'0', width:'250px', height:'200px'}}>
                                {this.state.alert()}
                            </div>
                            {/* 지워하야 하는 부분 */}
                            <Button
                            onClick={async ()=>{
                                const value = await axios.post("http://localhost:8888/testresult", { 
                                    aa : "abcdgg 안녕",
                                    bb : ['하나', '둘', '셋'],
                                    cc : {
                                        cc1 : '씨씨 안 객체 원',
                                        cc2 : "씨씨 안 객체 투"
                                    }
                                });
                                console.log(value);
                            }}>abc</Button><br />
                            {/* 지워하야 하는 부분 */}
                            
                    </div>
                    <DialogActions>
                        <Button onClick={() => this.props.onClickCancel()} >취소</Button>
                        <Button type="submit" color="primary">회원가입</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

export default Register;
