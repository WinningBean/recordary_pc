import React from 'react';
import './mainPage.css';
import Main from './Main';
import Aside from './Aside';
import TimelinePlusButton from 'Components/Main/TimelinePlusButton'
import Header from 'Components/Header/Header';
import { Redirect } from 'react-router-dom';

class MainPage extends React.Component {
    render() {
        if(!this.props.isLogin){
            return <Redirect to='/'/>;
        }
        return (
            <>
                <Header />
                <div id="main-page">
                    <div id="main-wrap">
                        <Main></Main>
                        <Aside></Aside>
                    </div>
                    <TimelinePlusButton></TimelinePlusButton>
                </div>
            </>
        );
    }
}

export default MainPage;
