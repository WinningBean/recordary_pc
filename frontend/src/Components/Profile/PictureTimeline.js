import React from 'react';
import './ProfilePage.css';
import './TimelineModal.css';

import Timeline from 'Components/Timeline/Timeline';
import TimelineWeekSchedule from 'Components/Timeline/TimelineWeekSchedule';
import TimelineOnlySchedule from 'Components/Timeline/TimelineOnlySchedule';

import Dialog from '@material-ui/core/Dialog';

class PictureTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TimelineClick: false,
            TimelineOnlyScheduleClick: false,
            TimelineWeekScheduleClick: false
        };
    }
    render() {
        const TimelineOpen = () => {
            if (this.state.TimelineClick === true) {
                return (
                    <Dialog
                        className='DialogTimeline'
                        open
                        style={{ backgroundColor: 'rgba(241, 242, 246,0.1)' }}
                        onClose={() => this.setState({ TimelineClick: false })}
                    >
                        <Timeline></Timeline>
                    </Dialog>
                );
            }
            return null;
        };
        return (
            <article>
                <div className="media-area">
                    <div className="media-box" onClick={()=> this.setState({TimelineClick : true})}>
                        <img alt='timeline-img' src='img/1579501322063.jpg' />
                    </div>
                </div>
                {TimelineOpen()}
            </article>
        );
    }
}

export default PictureTimeline;
