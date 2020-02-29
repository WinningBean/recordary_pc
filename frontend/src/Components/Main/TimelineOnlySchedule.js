import React from 'react';
import './mainPage.css';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class TimelineOnlySchedule extends React.Component {
    render() {
        return (
            // 일정 한개 공유일때
            <div className='timeline-schedule'>
                <div className='timeline-profile'>
                    <div className='profile-picture'>
                        <img alt='profile-img' src='profile-image.png' />
                    </div>
                    <div className='profile-name'>위성호</div>
                    <div className='profile-time'>
                        <div className='profile-time-text'>3일 전</div>
                    </div>
                    <div className='profile-moreIcon'>
                        <MoreVertIcon style={{ fontSize: 30 }}></MoreVertIcon>
                    </div>
                </div>
                <div className='timeline-schedule-info'>
                    <div className='timeline-schedule-shared'>
                        <div className='timeline-schedule-title'>
                            공유할 일정 제목
                        </div>
                        <div className='timeline-schedule-weekTable'>
                            일정 하나
                        </div>
                    </div>
                </div>
                <div classNamee='comment-context'>
                    <div className='comment-context-icon'>
                        <div className='comment-icon-left'>
                            <div className='likeIcon'>
                                <ThumbUpRoundedIcon style={{ fontSize: 30 }}>
                                    like
                                </ThumbUpRoundedIcon>
                            </div>
                            <div className='followIcon'>
                                <AddCircleIcon style={{ fontSize: 30 }}>
                                    follow
                                </AddCircleIcon>
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
                    <div className='comment-write'>댓글 작성란</div>
                </div>
            </div>
        );
    }
}

export default TimelineOnlySchedule;
