import React from 'react';
import './LoginPage.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Register from './Register';
import axios from 'axios';

class Login extends React.Component {
    state = {
        isRegister: false,
        successRegister: ()=>{},
        failedLogin: ()=>{},
        user_id: "",
        user_pw: "",
    }

    changeHandel = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    loginHandel = async (e) => {
        e.preventDefault();
        try {
            const Form = new FormData();
            Form.append('user_id', this.state.user_id);
            Form.append('user_pw', this.state.user_pw);
            const { data } = await axios.post("http://localhost:8888/loginRequest", Form);
            console.log(data);
            
            if(data.isLogin === false){
                this.setState({
                    failedLogin: () => {
                        return (
                            <Dialog open>
                                <div>
                                    <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        로그인에 실패하였습니다.
                                                <Button style={{ marginTop: '10px' }} onClick={() => {
                                            this.setState({ failedLogin: () => { } });
                                        }}>닫기</Button>
                                    </Alert>
                                </div>
                            </Dialog>
                        )
                    }
                })
                return;
            }
            // 주석 풀어야함
            this.props.onChangePage();
            return;
            
        } catch (error) {
            console.error(error);
        } finally {
            return false;
        }
    }

    render() {
        const MyButton = styled(Button)({
            backgroundColor: '#bdc3c7',
            marginRight: '10px',
            color: 'black',
        });
        const registerPage = (()=>{
            if(this.state.isRegister === true){
                return <Register
                    onSuccessRegister={
                        () => {
                            this.setState({  isRegister: false,
                                successRegister: () => {
                                    return (
                                        <Dialog open>
                                            <div>
                                                <Alert severity="success">
                                                    <AlertTitle>Success</AlertTitle>
                                                    회원가입을 성공하였습니다.
                                                    <Button style={{marginTop:'10px'}} onClick={() => {
                                                            this.setState({ successRegister: () => { } });
                                                        }}>닫기</Button>
                                                </Alert>
                                            </div>
                                        </Dialog>
                                    )
                                }
                            })
                        }
                }
                onClickCancel={
                    ()=>{this.setState({isRegister : false})}
                }></Register>;
            }
            return null;
        })();
        return (
            <div id="index-page">
                {registerPage}
                <form action="go_to_main" onSubmit={this.loginHandel}>
                    <div className="icon">
                        <a href="main" onClick={(e) => {
                            e.preventDefault();
                            this.props.onChangePage();
                        }}>
                            <img alt="Recordary icon" src="https://www.google.co.kr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" />
                        </a>
                    </div>
                    {this.state.successRegister()}
                    {this.state.failedLogin()}
                    <div className="login-form">
                        <div className="login-text">
                            <TextField name="user_id"
                                autoFocus
                                label="아이디"
                                onChange={this.changeHandel} />
                            <br />
                            <TextField
                                name="user_pw"
                                type="password"
                                label="비밀번호"
                                onChange={this.changeHandel} />
                            <br />
                        </div>
                        <div className="login-button">
                            <MyButton onClick={() => this.setState({isRegister : true})}>회원가입</MyButton>
                            <MyButton type="submit">로그인</MyButton>
                        </div>
                    </div>
                </form >
            </div>
        );
    }
}

export default Login;
