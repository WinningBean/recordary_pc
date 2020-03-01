import React from 'react';
import './ProfilePage.css';
import './TimelineModal.css';
import Timeline from 'Components/Timeline/Timeline';
import TimelineWeekSchedule from 'Components/Timeline/TimelineWeekSchedule';
import TimelineOnlySchedule from 'Components/Timeline/TimelineOnlySchedule';

import Dialog from '@material-ui/core/Dialog';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SmsIcon from '@material-ui/icons/Sms';

class ScheduleTimeline1 extends React.Component {
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
                        <TimelineWeekSchedule></TimelineWeekSchedule>
                    </Dialog>
                );
            }
            return null;
        };
        return (
            <article>
                <div className='media-area'>
                    <div
                        className='timeline-profile-schedule'
                        onClick={() => this.setState({ TimelineClick: true })}
                    >
                        <div className='timeline-profile-time'>
                            <div className='timeline-profile-top'>
                                <div className='timeline-profile-picture'>
                                    <img src='profile-image.png' />
                                </div>
                                <div className="timeline-profile-name">
                                    Water_Glasses
                                </div>
                            </div>
                            <div className="timeline-profile-top">
                                <div className="timeline-schedule-date">
                                    3일전
                                </div>
                            </div>
                        </div>
                        <div className="profile-schedule-info">
                            <div className="timeline-schedule-title">
                                게시물 제목이 되겠네요
                            </div>
                            <div className='timeline-schedule-weekTable'>
                                일정
                            </div>
                        </div>
                        <div classNamee='comment-context'>
                            <div className='comment-context-icon'>
                                <div className='comment-icon-left'>
                                    <div className='likeIcon'>
                                        <ThumbUpRoundedIcon
                                            style={{ fontSize: 30 }}
                                        >
                                            like
                                        </ThumbUpRoundedIcon>
                                    </div>
                                    <div className='commentIcon'>
                                        <SmsIcon style={{ fontSize: 30 }}>
                                            follow
                                        </SmsIcon>
                                    </div>
                                </div>
                                <div className='comment-icon-right'>
                                    <div className='shareIcon'>
                                        <ShareIcon style={{ fontSize: 30 }}>
                                            share
                                        </ShareIcon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {TimelineOpen()}
                </div>
            </article>
        );
    }
}

export default ScheduleTimeline1;
