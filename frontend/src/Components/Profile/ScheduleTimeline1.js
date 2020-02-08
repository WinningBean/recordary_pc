import React from 'react';
import './ProfilePage.css';

import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SmsIcon from '@material-ui/icons/Sms';

class ScheduleTimeline1 extends React.Component {
    render() {
        return (
            <article>
                <div className="media-area">
                    <div className="timeline-profile-schedule">
                        <div className="timeline-profile-time">
                            <div className="timeline-profile-top">
                                <div className="timeline-profile-picture">
                                    <img src="profile-image.png" />
                                </div>
                                <div className="timeline-profile-name">
                                    위성호
                                </div>
                            </div>
                            <div className="timeline-profile-top">
                                <div className="timeline-schedule-date">
                                    2020-01-01 ~ 2020-03-03
                                </div>
                                <MoreVertIcon stype={{fontSize:'30px'}}></MoreVertIcon>
                            </div>
                        </div>
                        <div className="profile-schedule-info">
                            <div className="timeline-schedule-title">
                                일정 제목
                            </div>
                            <div className="timeline-schedule-weekTable">
                                일정
                            </div>
                        </div>
                        <div classNamee="comment-context">
                            <div className="comment-context-icon">
                                <div className="comment-icon-left">
                                    <div className="likeIcon">
                                        <ThumbUpRoundedIcon style={{ fontSize: 30 }}>like</ThumbUpRoundedIcon>
                                    </div>
                                    <div className="commentIcon">
                                        <SmsIcon style={{ fontSize: 30 }}>follow</SmsIcon>
                                    </div>
                                </div>
                                <div className="comment-icon-right">
                                    <div className="shareIcon">
                                        <ShareIcon style={{ fontSize: 30 }}>share</ShareIcon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

export default ScheduleTimeline1;
