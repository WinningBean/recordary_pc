import React from 'react';
import './mainPage.css';

import Timeline from '../Timeline/Timeline';
import TimelineWeekSchedule from '../Timeline/TimelineWeekSchedule';

class Main extends React.Component {
  render() {
    var data = this.props.data;
    const timelineList = (() => {
      console.log(data);
      if (data.post === undefined) {
        return null;
      }
      return data.post.map((value) => {
        switch (value.postForm) {
          case 0:
            return (
              <div className='timeline-Margin' key={value.post_cd}>
                <Timeline data={value} />
              </div>
            );
          default:
            return (
              <div className='timeline-Margin' key={value.post_cd}>
                <TimelineWeekSchedule data={value}></TimelineWeekSchedule>
              </div>
            );
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
