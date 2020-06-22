import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios';

// severity (success or error)
// <AlertDialog severity='error' content='' onAlertClose={} onAlertSubmit={}/>

class AlertDialog extends React.Component {
  render() {
    return (
      <Dialog open>
        <div>
          <Alert severity={this.props.severity}>
            <AlertTitle>{this.props.severity}</AlertTitle>
            {this.props.content}
            {this.props.onAlertSubmit === undefined ? null : (
              <Button style={{ marginTop: '10px' }} onClick={() => this.props.onAlertSubmit()}>
                확인
              </Button>
            )}
            <Button
              style={{ marginTop: '10px' }}
              onClick={() => {
                this.props.onAlertClose();
              }}
            >
              닫기
            </Button>
          </Alert>
        </div>
      </Dialog>
    );
  }
}

export default AlertDialog;

// // 웹소켓 연결
// class ConnectWebSocket extends React.Component {

//   state = {
//     isStomp : false, // * 채팅부분 함께 사용
//     socket : null, // * 채팅부분 함께 사용
//     noticeMsg : null,
//     timeLineMsg : null,
//   }

//   componentDidMount () { // 웹소켓에 필요한 script 추가면 (사이트 접속 혹은 사용자 로그인시 구동하면 됨 - 모든 페이지에 있어야 함) * 채팅부분 함께 사용
//     const sockjs = document.createElement("script");
//     sockjs.src = "https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.3.0/sockjs.min.js"; // sockjs client를 통해 서버와 통신
//     sockjs.async = true;

//     const stomp = document.createElement("script");
//     stomp.src = "https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"; //stomp 프로토콜 사용
//     stomp.async = true;

//     document.body.appendChild(sockjs);
//     document.body.appendChild(stomp);
//   }

//   sendNotice(noticeType, activeCd, targetCd){ // 이벤트가 발생하면 메세지를 보내준다

//     // 사용자 이벤트 성공 시 밑의 이벤트로 메세지를 보내줘야함
//     // 사용자가 누군가 팔로우 했을 경우 : sendNotice("FOLLOW_NEW", 팔로우한 사용자 코드, 팔로우된 사용자 코드);
//     // 사용자가 그룹에 멤버로 신청할 경우 : sendNotice("GROUP_APPLY_COME", 신청한 사용자 코드, 신청된 그룹 코드);
//     // 사용자(그룹장)가 그룹에 누군가를 초대할 경우 : sendNotice("GROUP_APPLY_INVITE", 초대한 그룹 코드, 초대된 사용자 코드);
//     // 사용자가 그룹초대를 거절할 경우 : sendNotice("GROUP_APPLY_COME_NOT", 거절한 그룹 코드, 거절된 사용자 코드);
//     // 사용자(그룹장)가 그룹신청을 거절할 경우 : sendNotice("GROUP_APPLY_INVITE_NOT", 거절한 사용자 코드, 거절된 그룹 코드);
//     // 사용자가(그룹장)가 그룹신청을 수락할 경우 : sendNotice("GROUP_MEMBER_ALLOW", 그룹 코드, 멤버가 된 사용자 코드);
//     // 사용자가 그룹초대를 수락할 경우 : sendNotice("GROUP_MEMBER_NEW", 수락한 사용자 코드, 그룹 코드);
//     // 사용자가 그룹을 탈퇴할 경우 : sendNotice("GROUP_MEMBER_AWAY", 탈퇴한 사용자 코, 그룹 코드);
//     // 사용자가 게시물을 좋아요 할 시 : sendNotice("POST_LIKE_NEW", 좋아요한 사용자 코드, 좋아요된 게시물 코드);
//     // 사용자가 그룹 게시물(모든 타입)을 등록할 시 : sendNotice("POST_GROUP_NEW", 그룹 코드, 게시물 코드);
//     // 사용자가 누군가를 일정멤버로 초대할 경우 : sendNotice("SCHEDULE_MEMBER_INVITE", 스케줄 코드, 신청된 사용자 코드);
//     // 사용자가 일정멤버 초대를 거절할 경우 : sendNotice("SCHEDULE_MEMBER_INVITE_NOT", 거절한 사용자 코드, 스케줄 코드);
//     // 사용자가 일정멤버 초대를 수락할 경우 : sendNotice("SCHEDULE_MEMBER_ALLOW", 수락한 사용자 코드, 스케줄 코드);
//     // 사용자가 게시물에 댓글을 등록할 경우 : sendNotice("COMMENT_NEW", 댓글 코드, 게시물 코드);
//     // 사용자가 대댓글을 등록할 경우 : sendNotice("COMMENT_SUB_NEW", 대댓글 코드, 댓글 코드);

//     const noticeData = {
//       noticeType : noticeType, // 이벤트 타입
//       activeCd : activeCd, // 이벤트 주체
//       targetCd : targetCd // 이벤트 대상
//     }

//     if (!this.isStomp && this.socket !== 1) return;
//     if (this.isStomp)
//       this.socket.send('/pub/notice', {}, JSON.stringify(noticeData)); // 이벤트 발생 메세지를 '/ws-stomp/pub/notice'(this.socket의 endpoint + 매핑주소) 주소로 보내준다. * 같은 방식으로 채팅부분에 사용
//     else
//       this.socket.send(noticeData);
//   }

//   sendTimeLine(postCd){ // 이벤트가 발생하면 메세지를 보내준다.
//     // 사용자가 게시물을 추가하거나 수정하면 sendTimeLine(추가되거나 수정된 게시물 코드값);
//     if (!this.isStomp && this.socket !== 1) return;
//     if (this.isStomp)
//       this.socket.send('/pub/timeLine', {}, JSON.stringify(postCd)); // 이벤트 발생 메세지를 '/ws-stomp/pub/timeLine'(this.socket의 endpoint + 매핑주소) 주소로 보내준다. * 같은 방식으로 채팅부분에 사용
//         // post code 값만 객체로 보내주시면 됩니다.
//     else
//       this.socket.send(postCd);
//   }

//   userConnectStomp(){ // 사용자의 알람 토픽 구독 (사용자 로그인 성공시 연결해줘야 함)
//     const sock = new SockJS('/ws-stomp'); // 알람의 엔드포인트 연결
//     const client = Stomp.over(sock);

//     this.setState({ isStomp: true});
//     this.setState({ socket: client});

//     // * 위 부분 채팅부분 함께 사용

//     client.connect({}, function () {
//       console.log("Connect Notice Stomp");

//       client.subscribe('/topic/user/' + 로그인유저코드, function (response) { // 로그인 사용자의 알람 해당 토픽을 구독한다 -- 모든 페이지에서 구독 -> 로그인 시 구독
//         console.log("event : " + response);
//         this.checkNoticeType(JSON.parse(response.body)); // 어떤 이벤트인지 체크
//       })
//     });
//   }

//   timeLineConnectStomp(){ // 사용자의 새로운 타임라인 토픽 구독 (메인 페이지에서 구독해줘야 함) * 같은 방식으로 채팅부분에 사용
//     if (this.socket != null) {
//       this.socket.connect({}, function () {
//         console.log("Connect timeLine Stomp");

//         this.socket.subscribe('/queue/timeLine/' + 로그인유저코드, function (response) { // 로그인 사용자의 타임라인 토픽을 구독한다 -- 메인 페이지에서 구독 -> 메인페이지를 들릴 때마다 구독
//           console.log("event : " + response);
//           this.stomp_timeLine(JSON.parse(response.body));
//         })
//       });
//     }
//   }

//   stomp_timeLine(data){
//     // data === postResponseDto; // 타임라인시 반환하는 json 규격과 같습니다. 똑같이 활용하시면 됩니다.
//     if (data.groupFK != null){
//       this.setState({ timeLineMsg : "<button onclink=" + this.reset_timeLine() + ">" + data.groupFK.groupNm + "의 게시물이 올라왔습니다.</button>"});
//     }
//     else {
//       this.setState({ timeLineMsg : "<button onclink=" + this.reset_timeLine() + ">" + data.userFK.userId + "(" + data.userFK.userNm + ")님의 게시물이 올라왔습니다.</button>"});
//     }
//   }

//   reset_timeLine(){ // 사용자가 버튼을 눌렀을 때 타임라인을 다시 부르시면 될 것 같습니다.
//     window.scrollTo(0,0);
//     timeLineList = null;
//     (await axios.get(`/post/pagingTimeLine/{userCd}`)).data;
//   }

//   checkNoticeType(data){ // NoticeType 체크 후 사용자입장에서 알람 디자인 구성
//     if (data.noticeType == "FOLLOW_NEW") this.notice_FOLLOW_NEW(data.activeCd);
//     if (data.noticeType == "GROUP_APPLY_COME") this.notice_GROUP_APPLY_COME(data.activeCd, data.targetCd);
//     if (data.noticeType == "GROUP_APPLY_INVITE") this.notice_GROUP_APPLY_INVITE(data.activeCd);
//     if (data.noticeType == "GROUP_APPLY_COME_NOT") this.notice_GROUP_APPLY_COME_NOT(data.activeCd);
//     if (data.noticeType == "GROUP_APPLY_INVITE_NOT") this.notice_GROUP_APPLY_INVITE_NOT(data.activeCd, data.targetCd);
//     if (data.noticeType == "GROUP_MEMBER_ALLOW") this.notice_GROUP_MEMBER_ALLOW(data.activeCd);
//     if (data.noticeType == "GROUP_MEMBER_NEW") this.notice_GROUP_MEMBER_NEW(data.activeCd, data.targetCd);
//     if (data.noticeType == "GROUP_MEMBER_AWAY") this.notice_GROUP_MEMBER_AWAY(data.activeCd, data.targetCd);
//     if (data.noticeType == "POST_LIKE_NEW") this.notice_POST_LIKE_NEW(data.activeCd, data.targetCd);
//     if (data.noticeType == "POST_GROUP_NEW") this.notice_POST_GROUP_NEW(data.activeCd, data.targetCd);
//     if (data.noticeType == "SCHEDULE_MEMBER_INVITE") this.notice_SCHEDULE_MEMBER_INVITE(data.activeCd);
//     if (data.noticeType == "SCHEDULE_MEMBER_INVITE_NOT") this.notice_SCHEDULE_MEMBER_INVITE_NOT(data.activeCd, data.targetCd);
//     if (data.noticeType == "SCHEDULE_MEMBER_ALLOW") this.notice_SCHEDULE_MEMBER_ALLOW(data.activeCd, data.targetCd);
//     if (data.noticeType == "COMMENT_NEW") this.notice_COMMENT_NEW(data.activeCd, data.targetCd);
//     if (data.noticeType == "COMMENT_SUB_NEW") this.notice_COMMENT_SUB_NEW(data.activeCd, data.targetCd);
//   }

//   notice_FOLLOW_NEW(activeCd){
//     const activeUser = (await axios.get(`/user/${activeCd}`)).data;
//     this.setState({noticeMsg: "<a href='/" + activeUser.userId + "'>" + activeUser.userId + "(" + activeUser.userNm + ")님이 회원님을 팔로우하였습니다.</a>"});
//   }

//   notice_GROUP_APPLY_COME(activeCd, targetCd){
//     const activeUser = (await axios.get(`/user/${activeCd}`)).data;
//     const targetGroup = (await axios.get(`/group/${targetCd}`)).data;
//     this.setState({ noticeMsg : "<a href='/" + activeUser.userId + "'>" + activeUser.userId + "(" + activeUser.userNm + ")님이 " + targetGroup.groupNm + "에 그룹원 신청을 보냈습니다.</a>"})
//   }

//   notice_GROUP_APPLY_INVITE(activeCd){
//     const activeGroup = (await axios.get(`/group/${activeCd}`)).data;
//     this.setState({noticeMsg : "<a href='/group/" + activeGroup.groupCd + "'>" + activeGroup.groupNm + "이 회원님에게 그룹초대를 보냈습니다.</a>"});
//   }

//   notice_GROUP_APPLY_COME_NOT(activeCd){
//     const activeGroup = (await axios.get(`/group/${activeCd}`)).data;
//     this.setState({noticeMsg : "<a href='/group/" + activeGroup.groupCd + "'>" + activeGroup.groupNm + "이 그룹신청을 거절하였습니다.</a>"});
//   }

//   notice_GROUP_APPLY_INVITE_NOT(activeCd, targetCd){
//     const activeUser = (await axios.get(`/user/${activeCd}`)).data;
//     const targetGroup = (await axios.get(`/group/${targetCd}`)).data;
//     this.setState({noticeMsg : "<a href='/" + activeUser.userId + "'>" + activeUser.userId + "(" + activeUser.userNm + ")님이 " + targetGroup.groupNm + "의 그룹초대를 거절하였습니다.</a>"});
//   }

//   notice_GROUP_MEMBER_ALLOW(activeCd){
//     const activeGroup = (await axios.get(`/group/${activeCd}`)).data;
//     this.setState({noticeMsg : "<a href='/group/" + activeGroup.groupCd + "'>" + activeGroup.groupNm + "이 회원의 그룹신청을 수락하였습니다.</a>"});
//   }

//   notice_GROUP_MEMBER_NEW(activeCd, targetCd){
//     const activeUser = (await axios.get(`/user/${activeCd}`)).data;
//     const targetGroup = (await axios.get(`/group/${targetCd}`)).data;
//     this.setState({noticeMsg : "<a href='/" + activeUser.userId + "'>" + activeUser.userId + "(" + activeUser.userNm + ")님이 " + targetGroup.groupNm + "의 그룹초대를 수락하였습니다.</a>"});
//   }

//   notice_GROUP_MEMBER_AWAY(activeCd, targetCd){
//     const activeUser = (await axios.get(`/user/${activeCd}`)).data;
//     const targetGroup = (await axios.get(`/group/${targetCd}`)).data;
//     this.setState({noticeMsg : "<a href='/" + activeUser.userId + "'>" + activeUser.userId + "(" + activeUser.userNm + ")님이 " + targetGroup.groupNm + "를 탈퇴하였습니다.</a>"});
//   }

//   notice_POST_LIKE_NEW(activeCd, targetCd){
//     const activeUser = (await axios.get(`/user/${activeCd}`)).data;
//     const targetPost = (await axios.get(`/post/${targetCd}`)).data;
//     this.setState({noticeMsg : "<button onclick='게시물 팝업창 띄우기'>" + activeUser.userId + "(" + activeUser.userNm + ")님이 회원님의 " + targetPost.postCd + "번 게시물을 좋아합니다.</button>"});
//   }

//   notice_POST_GROUP_NEW(activeCd, targetCd){
//     const activeGroup = (await axios.get(`/group/${activeCd}`)).data;
//     const targetPost = (await axios.get(`/post/${targetCd}`)).data;
//     this.setState({noticeMsg : "<button onclick='게시물 팝업창 띄우기'>" + activeGroup.groupNm + "의 게시물이 등록되었습니다.</button>"});
//   }

//   notice_SCHEDULE_MEMBER_INVITE(activeCd){
//     const activeSchedule = (await axios.get(`/schedule/${activeCd}`)).data;
//     this.setState({noticeMsg : "<button onclick='일정 작은 팝업'>" + activeSchedule.scheduleNm + "에 회원님이 일정멤버로 초대되었습니다.</button>"});
//   }

//   notice_SCHEDULE_MEMBER_INVITE_NOT(activeCd, targetCd){
//     const activeUser = (await axios.get(`/user/${activeCd}`)).data;
//     const targetSchedule = (await axios.get(`/schedule/${targetCd}`)).data;
//     this.setState({noticeMsg : "<a href='/" + activeUser.userId + "'>" + activeUser.userId + "(" + activeUser.userNm + ")님이 " + targetSchedule.scheduleNm + "에 일정멤버 초대를 거절하였습니다.</a>"});
//   }

//   notice_SCHEDULE_MEMBER_ALLOW(activeCd, targetCd){
//     const activeUser = (await axios.get(`/user/${activeCd}`)).data;
//     const targetSchedule = (await axios.get(`/schedule/${targetCd}`)).data;
//     this.setState({noticeMsg : "<button onclick='일정 작은 팝업'>" + activeUser.userId + "(" + activeUser.userNm + ")님이 " + targetSchedule.scheduleNm + "에 일정멤버 초대를 수락하였습니다.</button>"});
//   }

//   notice_COMMENT_NEW(activeCd, targetCd){
//     const activeComment = (await axios.get(`/comment/${activeCd}`)).data;
//     const targetPost = (await axios.get(`/post/${targetCd}`)).data;
//     this.setState({noticeMsg : "<button onclick='게시물 팝업창 띄우기'>" + activeComment.userFK.userId + "(" + activeComment.userFK.userNm + ")님이 회원님의 " + targetPost.postCd + "번 게시물에 댓글을 남겼습니다.</button>"});
//   }

//   notice_COMMENT_SUB_NEW(activeCd, targetCd){
//     const activeComment = (await axios.get(`/comment/${activeCd}`)).data;
//     const targetPost = (await axios.get(`/post/${activeComment.postCd}`)).data;
//     this.setState({noticeMsg : "<button onclick='게시물 팝업창 띄우기'>" + activeComment.userFK.userId + "(" + activeComment.userFK.userNm + ")님이 회원님의 댓글에 답글을 남겼습니다.</button>"});
//   }
// }
