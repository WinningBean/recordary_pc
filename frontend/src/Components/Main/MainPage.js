import React from 'react';
import './mainPage.css';
import Header from '../Header/Header';
import Main from './Main';
import Profile from '../Profile/Profile';
import Loading from '../Loading/Loading';
import Aside from './Aside';
import TimelinePlusButton from 'Components/Main/TimelinePlusButton'

import axios from 'axios';

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userCode : this.props.userCode,
            isLoading : true,
            postAppendClick : false,
            data : {},
            mainCurrPage: 0,
            mainPage : [
                () => {
                    return (
                        <div id="main-wrap">
                            <Main data={this.state.data}
                            onChangeMainPage={()=>{
                                this.setState({mainCurrPage : 1});
                            }}
                            ></Main>
                            <Aside></Aside>
                        </div>
                    )
                },
                () => {
                    return (
                        <Profile  onChangeMainPage={()=>{
                            this.setState({mainCurrPage : 0});
                        }}></Profile>
                )}
            ]
            }
    }

    async componentDidMount(){
        // 유저에 대한 정보를 가져오고 그 결과값을 state 에 저장
        // const {data} = await axios.get("http://localhost:8888/mainPage");
        const data = {
            currentUser:{
                user_ex: null,
                user_id: 'HelloWorld1234',
                user_nm: '홍길동'
        },
        userFriend:[
            {
                friend_cd:1,
                friend_nm:'친구1',
                friend_pic:'http://placehold.it/40x40',
            },
            {
                friend_cd:1,
                friend_nm:'친구2',
                friend_pic:'http://placehold.it/40x40',
            }
        ],
        userGroup:[
            {
                group_cd:1,
                group_nm:'그룹1',
                group_pic:'http://placehold.it/40x40',
            },
            {
                group_cd:2,
                group_nm:'그룹2',
                group_pic:'http://placehold.it/40x40',
            }
        ]
    }
        this.setState({data, isLoading : false});   
        console.log(data);
    }

    render() {
        
        if(this.state.isLoading === true){
            return (
                <Loading></Loading>
            )
        }
        return (
            <div id="main-page">
                <Header data={this.state.data}
                onProfileShow={()=>{
                    this.setState({mainCurrPage : 1});
                }}
                ></Header>
                {this.state.mainPage[this.state.mainCurrPage]()}
                <TimelinePlusButton></TimelinePlusButton>
            </div>
        );
    }
}

export default MainPage;
