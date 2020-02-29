import React from 'react';
import './mainPage.css';

import Timeline from 'Components/Timeline/Timeline';
import TimelineWeekSchedule from 'Components/Timeline/TimelineWeekSchedule';
import TimelineOnlySchedule from 'Components/Timeline/TimelineOnlySchedule';



class Main extends React.Component {
    
    render() {
        return (
            <main>
                <div id="timeline-list">
                    <div className="timeline-Margin">
                        <Timeline></Timeline>
                    </div>
                    <div className="timeline-Margin">
                        <TimelineWeekSchedule></TimelineWeekSchedule>
                    </div><div className="timeline-Margin">
                        <TimelineOnlySchedule></TimelineOnlySchedule>
                    </div>
                </div>
            </main>
        );
    }
}

export default Main;