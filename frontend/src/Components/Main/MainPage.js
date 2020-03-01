import React from 'react';
import './mainPage.css';
import Main from './Main';
import Aside from './Aside';
import SchedulePlusButton from 'Components/Main/SchedulePlusButton'
import Header from 'Containers/Header/Header';
import { Redirect } from 'react-router-dom';

class MainPage extends React.Component {
    render() {
        console.log(this.props);
        if (!this.props.isLogin) {
            return <Redirect to='/' />;
        }
        return (
            <>
                <Header />
                <div id='main-page'>
                    <div id='main-wrap'>
                        <Main></Main>
                        <Aside></Aside>
                    </div>
                    <SchedulePlusButton></SchedulePlusButton>
                </div>
            </>
        );
    }
}

export default MainPage;
