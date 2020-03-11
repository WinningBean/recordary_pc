import React from 'react';
import './mainPage.css';

import Timeline from 'Components/Timeline/Timeline';
import TimelineWeekSchedule from 'Components/Timeline/TimelineWeekSchedule';
import TimelineOnlySchedule from 'Components/Timeline/TimelineOnlySchedule';

class Main extends React.Component {
  render() {
    var data = this.props.data;
    const timelineList = (() => {
      return data.post.map(value => {
        switch (value.postForm) {
          case 0:
            return (
              <div className='timeline-Margin' key={value.post_cd}>
                <Timeline data={value} />
              </div>
            );
          case 1:
            return (
              <div className='timeline-Margin'>
                <TimelineWeekSchedule></TimelineWeekSchedule>
              </div>
            );
          case 2:
            return (
              <div className='timeline-Margin'>
                <TimelineOnlySchedule></TimelineOnlySchedule>
              </div>
            );
          default:
            return;
        }
      });
    })();
    return (
      <main>
        <div id='timeline-list'>{timelineList}</div>
      </main>
    );
  }
}

export default Main;
