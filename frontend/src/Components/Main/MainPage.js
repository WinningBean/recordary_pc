import React from 'react';
import './mainPage.css';
import Header from '../Header/Header';
import Main from './Main';
import Profile from '../Profile/Profile';
import Loading from '../Loading/Loading';
import Aside from './Aside';

import axios from 'axios';

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userCode : this.props.userCode,
            isLoading : true,
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
        const {data} = await axios.get("http://localhost:8888/mainPage");
    //     const data = {
    //         currentUser:{
    //             userEx: null,
    //             userId: '1234',
    //             userNm: '홍길동'
    //     },
    //     userFriend:[
    //         {
    //             friendCd:1,
    //             friendNm:'친구1',
    //             friendPic:'none'
    //         },
    //         {
    //             friendCd:1,
    //             friendNm:'친구2',
    //             friendPic:'none'
    //         }
    //     ],
    //     userGroup:[
    //         {
    //             groupCd:1,
    //             groupNm:'그룹1',
    //             groupPic:'none'
    //         },
    //         {
    //             groupCd:2,
    //             groupNm:'그룹2',
    //             groupPic:'none'
    //         }
    //     ]
    // }
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
            </div>
        );
    }
}

export default MainPage;
