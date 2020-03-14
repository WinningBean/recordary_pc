import React from 'react';
import './mainPage.css';

import Timeline from 'Components/Timeline/Timeline';
import TimelineWeekSchedule from 'Components/Timeline/TimelineWeekSchedule';

class Main extends React.Component {
  render() {
    var data = this.props.data;
    const timelineList = (() => {
      console.log(data);
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
              <div className='timeline-Margin' key={value.post_cd}>
                <TimelineWeekSchedule data={value}></TimelineWeekSchedule>
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
