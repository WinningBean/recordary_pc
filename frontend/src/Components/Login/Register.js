import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Spinner from '@material-ui/core/CircularProgress';
import axios from 'axios';
import AlertDialog from '../Other/AlertDialog';

class Register extends React.Component {
    state = {
        user_nm : "",
        user_id: "",
        user_pw: "",
        user_pw_check: "",
        isSamePw: undefined,
        alert : ()=>{ },
        alertDialog: ()=>{},
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
            <Dialog open fullWidth>
                <DialogTitle>회원가입</DialogTitle>
                <form method="POST" onSubmit={async (e) => {
                    e.preventDefault();
                    const nameRules = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
                    if (!nameRules.test(this.state.user_nm)) {
                        this.setState({
                            alertDialog: () => {
                                return (
                                    <AlertDialog
                                        severity="error"
                                        content="이름이 옳바르지않습니다 다시 작성해주세요."
                                        onAlertClose={() => { this.setState({ alertDialog: () => { } }); }} />
                                )
                            }
                        })
                        return;
                    }
                    if (this.state.user_id === "") {
                        this.setState({
                            alertDialog: () => {
                                return (
                                    <AlertDialog
                                        severity="error"
                                        content="아이디를 입력하세요."
                                        onAlertClose={() => { this.setState({ alertDialog: () => { } }); }} />
                                )
                            }
                        })
                        return;
                    }
                    if (this.state.user_pw === "") {
                        this.setState({
                            alertDialog: () => {
                                return (
                                    <AlertDialog
                                        severity="error"
                                        content="패스워드를 입력하세요."
                                        onAlertClose={() => { this.setState({ alertDialog: () => { } }); }} />
                                )
                            }
                        })
                        return;
                    }
                    if (!this.state.isSamePw) {
                        this.setState({
                            alertDialog: () => {
                                return (
                                    <AlertDialog
                                        severity="error"
                                        content="패스워드가 같지않습니다."
                                        onAlertClose={() => { this.setState({ alertDialog: () => { } }); }} />
                                )
                            }
                        })
                        return;
                    }
                    // const passwordRules = /^[a-zA-Z0-9]{10,15}$/;
                    const passwordRules = /^[0-9]{4,15}$/;
                    if (!passwordRules.test(this.state.user_pw)) {
                        this.setState({
                            alertDialog: () => {
                                return (
                                    <AlertDialog
                                        severity="error"
                                        content="패스워드는 숫자와 영문자 조합으로 10~15자리를 사용해야 합니다."
                                        onAlertClose={() => { this.setState({ alertDialog: () => { } }); }} />
                                )
                            }
                        })
                        return;
                    }
                    this.setState({alert : ()=>{return <Spinner style={{position:'absolute', top:'30px', left:'100px'}}/>}})
                    try{
                        const form = new FormData();
                        form.append('user_nm', this.state.user_nm);
                        form.append('user_id', this.state.user_id);
                        form.append('user_pw', this.state.user_pw);
                        const { data } = await axios.post("http://localhost:8080/user/joinRequest", form);
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
                                회원가입에 실패하였습니다.
                            </Alert>)
                            }})
                            return;
                        }
                        this.props.onSuccessRegister();
                    }catch(error){
                        console.error(error);
                        this.setState({alert : () => {
                            return (<Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            서버 문제로 인해 회원가입에 실패하였습니다. 다시 한번 시도해주세요.
                        </Alert>)
                        }})
                    }
                }}>
                    <div className="register-text" style={{position:'relative', paddingLeft:"100px"}}>
                        <TextField
                            name="user_nm"
                            autoFocus
                            label="이름"
                            onChange={this.changeHandel} />
                            <br />
                        <TextField
                            name="user_id"
                            label="아이디"
                            onChange={this.changeHandel} />
                            <br />
                        <TextField
                            name="user_pw"
                            type="password"
                            label="비밀번호"
                            onChange={(e) => {
                                this.changeHandel(e);
                                if(e.target.value === "" || this.state.user_pw_check === ""){
                                    this.setState({isSamePw : undefined});
                                    return;
                                }
                                if(this.state.user_pw_check === e.target.value){
                                    this.setState({isSamePw : true});
                                    return;
                                }
                                this.setState({isSamePw : false});
                                }} />
                            <br />
                        <TextField
                            name="user_pw_check"
                            type="password"
                            label="비밀번호 확인"
                            onChange={(e)=>{
                                this.changeHandel(e);
                                if(e.target.value === "" || this.state.user_pw === ""){
                                    this.setState({isSamePw : undefined});
                                    return;
                                }
                                if(this.state.user_pw === e.target.value){
                                    this.setState({isSamePw : true});
                                    return;
                                }
                                this.setState({isSamePw : false});
                            }} />
                            <br />
                            <div className="register-alert" style={{position:'absolute', right:'40px', top:'0', width:'250px', height:'200px'}}>
                                {this.state.alert()}
                            </div>
                    </div>
                    <DialogActions>
                        {alertLabel}
                        <Button onClick={() => this.props.onClickCancel()} >취소</Button>
                        <Button type="submit" color="primary">회원가입</Button>
                    </DialogActions>
                </form>
                {this.state.alertDialog()}
            </Dialog>
        );
    }
}

export default Register;
