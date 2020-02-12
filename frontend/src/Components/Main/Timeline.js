import React from 'react';
import './mainPage.css';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class Timeline extends React.Component {
    render() {
        return (
            <div className="timeline">
                <div className="timeline-profile">
                    <div className="profile-picture">
                        <img alt="profile-img" src="profile-image.png" />
                    </div>
                    <div className="profile-name">
                        위승빈
                    </div>
                    <div className="profile-time">
                        <div className="profile-time-text">
                            1일 전
                        </div>
                    </div>
                    <div className="profile-moreIcon">
                        <MoreVertIcon style={{ fontSize: 30 }}></MoreVertIcon>
                    </div>
                </div>
                <div className="timeline-info">
                    <div className="time-line-picture-info">
                        <div className="timeline-picture">
                            <img alt="timeline-img" src="http://placehold.it/490x330" />
                        </div>
                        <div className="timeline-title">
                            게시물제목 또는 일정제목
                        </div>
                        <div className="timeline-context">
                            게시물내용 또는 일정내용
                        </div>
                    </div>
                    <div className="comment-context">
                        <div className="comment-title">
                            Comment
                        </div>
                        <div className="comment-reply">
                            댓글 내용들
                            <div>abc</div>
                            <div>abc</div>
                        </div>
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
            </div>
        );
    }
}

export default Timeline;
