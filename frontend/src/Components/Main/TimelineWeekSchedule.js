import React from 'react';
import './mainPage.css';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class TimelineWeekSchedule extends React.Component {
    render() {
        return(
            // 타임라인스케쥴 => 공유하고싶은 주일때
            <div className="timeline-schedule">
                <div className="timeline-profile">
                    <div className="profile-picture">
                        <img alt="profile-img" src="profile-image.png" />
                    </div>
                    <div className="profile-name">
                        황수경
                    </div>
                    <div className="profile-time">
                        <div className="profile-time-text">
                            2일 전
                        </div>
                    </div>
                    <div className="profile-moreIcon">
                        <MoreVertIcon style={{ fontSize: 30 }}></MoreVertIcon>
                    </div>
                </div>
                <div className="timeline-schedule-info">
                    <div className="timeline-schedule-shared">
                        <div className="timeline-schedule-title">
                            공유할 일정 제목
                        </div>
                        <div className="timeline-schedule-weekTable">
                            <table border="1">
                                <th>일</th>
                                <th>월</th>
                                <th>화</th>
                                <th>수</th>
                                <th>목</th>
                                <th>금</th>
                                <th>토</th>
                                <tr>
                                    <td>일요일입니담</td>
                                    <td>월요일입니담</td>
                                    <td>화요일입니담</td>
                                    <td>졸작 하는 날</td>
                                    <td>목요일입니담</td>
                                    <td>금요일입니담</td>
                                    <td>졸작 하는 날</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div classNamee="comment-context">
                    <div className="comment-context-icon">
                        <div className="comment-icon-left">
                            <div className="likeIcon">
                                <ThumbUpRoundedIcon style={{ fontSize: 30 }}>like</ThumbUpRoundedIcon>
                            </div>
                            <div className="followIcon">
                                <AddCircleIcon style={{ fontSize: 30 }}>follow</AddCircleIcon>
                            </div>
                        </div>
                        <div className="comment-icon-right">
                            <div className="shareIcon">
                                <ShareIcon style={{ fontSize: 30 }}>share</ShareIcon>
                            </div>
                        </div>
                    </div>
                    <div className="comment-write">
                        댓글 작성란
                    </div>
                </div>
            </div>
        );
    }
}

export default TimelineWeekSchedule;
