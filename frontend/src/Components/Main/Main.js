import React from 'react';

class Main extends React.Component {
    render() {
        return (
            <main>
                <div id="timeline-list">
                    <div className="timeline-1">
                        <div className="timeline-picture">
                            {/* <img src="1579501322063.jpg" /> */}
                        </div>

                        <div className="timeline-info">
                            <div className="timeline-profile">
                                <div className="profile-picture">
                                    {/* <img src="profile-image.png" /> */}
                                </div>
                                <div className="profile-name">
                                    위승빈
                        </div>
                            </div>
                            <div className="timeline-comment">
                                <div className="status-message">
                                    안녕하세요 ㅠㅠ
                        </div>
                                <div className="comment-list">
                                    댓글 목록
                        </div>
                                <div className="comment-buttons">
                                    좋아요, 팔로우, 팔로잉
                        </div>
                                <div className="comment-input">
                                    댓글 입력
                        </div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-2">
                        <div className="timeline2-schedual">
                            ssa
                </div>
                        <div className="timeline-info">
                            <div className="timeline-profile">
                                <div className="profile-picture">
                                    a
                        </div>
                                <div className="profile-name">
                                    aa
                        </div>
                            </div>
                            <div className="timeline-comment">
                                <div className="comment-list">
                                    리스트
                        </div>
                                <div className="comment-buttons">
                                    ss
                        </div>
                                <div className="comment-input">
                                    ss
                        </div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-3">
                        <div className="timeline-picture">
                            이미지
                </div>

                        <div className="timeline-info">
                            <div className="timeline-profile">
                                <div className="profile-picture">
                                    a
                        </div>
                                <div className="profile-name">
                                    aa
                        </div>
                            </div>
                            <div className="timeline-comment">
                                <div className="timeline3-schedual">
                                    일정
                        </div>
                                <div className="timeline3-comment-list">
                                    댓글
                        </div>
                                <div className="comment-buttons">
                                    버튼 좋아요
                        </div>
                                <div className="comment-input">
                                    댓글추가
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Main;