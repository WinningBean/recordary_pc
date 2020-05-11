import React from 'react';
import './mainPage.css';

import Timeline from '../Timeline/Timeline';
import TimelineWeekSchedule from '../Timeline/TimelineWeekSchedule';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      postForm: 0,
    };
  }
  render() {
    const timelineList = (() => {
      console.log(this.state.data);
      if (this.state.data.post === undefined) {
        return null;
      }

      // const postList = axait axios.get()

      return this.state.data.post.map((value) => {
        // if (value.mediaCd !== null ? (this.state.postForm = 0) : (this.state.postForm = 1))
        switch (this.state.postForm) {
          case 0:
            return (
              <div className='timeline-Margin' key={value.postOriginCd}>
                <Timeline data={value} />
              </div>
            );
          default:
            return (
              <div className='timeline-Margin' key={value.postOriginCd}>
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
