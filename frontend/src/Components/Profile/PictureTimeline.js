import React from 'react';
import './ProfilePage.css';
import './TimelineModal.css';

import Timeline from '../Main/Timeline';
import TimelineWeekSchedule from '../Main/TimelineWeekSchedule';
import TimelineOnlySchedule from '../Main/TimelineOnlySchedule';

import Dialog from '@material-ui/core/Dialog';

class PictureTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TimelineClick : false,
            TimelineOnlyScheduleClick : false,
            TimelineWeekScheduleClick : false,
        }
    }
    render() {
        const TimelineOpen = () => {
            if(this.state.TimelineClick === true){
                return (
                    <Dialog className="DialogTimeline" open style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }} onClose={()=> this.setState({TimelineClick : false})}>
                        <Timeline></Timeline>
                    </Dialog>
                )
            }
            return null;
        }
        return (
            <article>
                <div className="media-area">
                    <div className="media-box" onClick={()=> this.setState({TimelineClick : true})}>
                        <img src="http://placehold.it/300x300"></img>
                    </div>
                </div>
                {TimelineOpen()}

            </article>
        );
    }
}

export default PictureTimeline;
