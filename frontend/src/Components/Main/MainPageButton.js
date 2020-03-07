import React from 'react';
import './mainPage.css';
import ChoosePostAppend from 'Components/Profile/ChoosePostAppend';
import ChattingButton from 'Components/Other/ChattingButton';
import SpeedDials from 'Components/UI/SimpleSpeedDial';


class MainPageButton extends React.Component {

    render() {
        return (
            <div>
                <div className="timeline-plus-button">
                    <SpeedDials/>
                </div>
                <div  className="timeline-chatting-button" >
                    <ChattingButton/>
                </div>
            </div>
        );
    }
}

export default MainPageButton;
