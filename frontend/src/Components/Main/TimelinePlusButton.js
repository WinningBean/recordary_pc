import React from 'react';
import './mainPage.css';
import ChoosePostAppend from 'Components/Profile/ChoosePostAppend';
import FloatingActionButtons from 'Components/Other/FloatingActionButtons';
import SpeedDials from 'Components/UI/SimpleSpeedDial';


class TimelinePlusButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postAppendClick : false,
        }
    }

    render() {
        
        const PostAppendMenu = () => {
            if(this.state.postAppendClick === true){
                return <ChoosePostAppend onCancel={() => this.setState({ postAppendClick: false })}></ChoosePostAppend>
            }
            return null;
        }

        
        return (
            <div>
                <div className="timeline-plus-button"  onClick={()=> this.setState({postAppendClick: true})} >
                    {/* <FloatingActionButtons onCancel={() => this.setState({ postAppendClick: false })}/> */}
                    <SpeedDials/>
                </div>
                {PostAppendMenu()}
            </div>

        );
    }
}

export default TimelinePlusButton;
