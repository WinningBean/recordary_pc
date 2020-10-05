import React, { useEffect, useState } from 'react';

import Stomp from 'stompjs';
import SockJs from 'sockjs-client';
import axios from 'axios';

import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

const WebSocket = ({ userCd, userId, notice, onSaveNoticeList }) => {
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [client, setClient] = useState(null);

  useEffect(() => {
    var sock = new SockJs('/ws-stomp');
    var client = Stomp.over(sock);
    console.log(sock, client);
    client.connect({}, function () {
      setClient(client);

      client.subscribe(`/topic/user/${userCd}`, function (response) {
        // 로그인 사용자의 알람 해당 토픽을 구독한다 -- 모든 페이지에서 구독 -> 로그인 시 구독
        console.log(response.body, '');
        if (response.body === 'TRY_SOMEONE_LOGIN') {
          disconnectSession();
        }
        if (response.body === 'AUTO_LOGOUT') {
          window.alert('세션을 잃어 자동 로그아웃되었습니다.');
          window.location.replace('/');
        }
        checkNoticeType(JSON.parse(response.body));
      });
    });
    setClient(client);

    return () => {
      if (client.connected) client.disconnect();
    };
  }, []);

  useEffect(() => {
    if (client === null || notice === null) {
      return;
    }
    if (!client.connected) return;

    console.log(notice);
    client.send('/pub/notice', {}, JSON.stringify(notice));
  }, [notice, client]);

  const disconnectSession = async () => {
    try {
      window.alert('다른 컴퓨터로 로그인되었습니다.');
      await axios.post('/user/logout', userCd, {
        headers: { 'Content-Type': 'application/json' },
      });
      window.location.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  const checkNoticeType = async (data) => {
    // NoticeType 체크 후 사용자입장에서 알람 디자인 구성
    var activeUser = undefined;
    var activeGroup = undefined;
    var activeSchedule = undefined;
    var activeComment = undefined;
    var targetGroup = undefined;
    var targetPost = undefined;
    var targetSchedule = undefined;

    var message = null;

    switch (data.noticeType) {
      case 'FOLLOW_NEW':
        try {
          activeUser = (await axios.get(`/user/${data.activeCd}`)).data;
          message = {
            text: `${activeUser.userId}(${activeUser.userNm})님이 회원님을 팔로우 하였습니다.`,
            type: 'info',
            action: `/${activeUser.userId}`,
          };
        } catch (error) {
          console.error(error);
        }
        break;
      case 'GROUP_APPLY_COME':
        try {
          activeUser = (await axios.get(`/user/${data.activeCd}`)).data;
          targetGroup = (await axios.get(`/group/?input=${data.targetCd}`)).data;
          message = {
            text: `${activeUser.userNm})님이 '${targetGroup.groupNm}' 그룹에게 그룹원 신청을 보냈습니다.`,
            type: 'info',
            action: `/${activeUser.userNm}`,
          };
        } catch (error) {
          console.error(error);
        }
        break;
      case 'GROUP_APPLY_INVITE':
        try {
          activeGroup = (await axios.get(`/group/?input=${data.activeCd}`)).data;
          message = {
            text: `'${activeGroup.groupNm}' 그룹이 회원님에게 그룹초대를 보냈습니다.`,
            type: 'info',
            action: `/group/${activeGroup.groupCd}`,
          };
          const { data } = await axios.get(`/notice/accept/${userCd}`);
          onSaveNoticeList(data);
        } catch (error) {
          console.error(error);
        }
        break;
      case 'GROUP_APPLY_COME_NOT':
        try {
          activeUser = (await axios.get(`/user/${data.activeCd}`)).data;
          message = {
            text: `'${targetGroup.groupNm}' 그룹이 그룹신청을 거절하였습니다.`,
            type: 'warning',
            action: `/group/${targetGroup.groupCd}`,
          };
        } catch (error) {
          console.error(error);
        }
        break;
      case 'GROUP_APPLY_INVITE_NOT':
        try {
          activeUser = (await axios.get(`/user/${data.activeCd}`)).data;
          message = {
            text: `${activeUser.userId}(${activeUser.userNm})님이 '${targetGroup.groupNm}' 그룹 초대를 거절하였습니다`,
            type: 'warning',
            action: `/${activeUser.userId}`,
          };
        } catch (error) {
          console.error(error);
        }
        break;
      case 'GROUP_MEMBER_ALLOW':
        try {
          activeGroup = (await axios.get(`/group/?input=${data.activeCd}`)).data;
          message = {
            text: `${activeUser.userId}(${activeUser.userNm})님이 ${targetGroup.groupNm} 의 그룹초대를 수락하였습니다.`,
            type: 'info',
            action: `/group/${targetGroup.groupCd}`,
          };
        } catch (error) {
          console.error(error);
        }
        break;
      case 'GROUP_MEMBER_NEW':
        try {
          activeUser = (await axios.get(`/user/${data.activeCd}`)).data;
          targetGroup = (await axios.get(`/group/?input=${data.targetCd}`)).data;
          message = {
            text: `${activeUser.userId}(${activeUser.userNm})님이 ${targetGroup.groupNm} 의 그룹초대를 수락하였습니다.`,
            type: 'info',
            action: `/group/${targetGroup.groupCd}`,
          };
        } catch (error) {
          console.error(error);
        }
        break;
      case 'GROUP_MEMBER_AWAY':
        try {
          activeUser = (await axios.get(`/user/${data.activeCd}`)).data;
          targetGroup = (await axios.get(`/group/?input=${data.targetCd}`)).data;
          message = {
            text: `${activeUser.userId}(${activeUser.userNm}님이 '${targetGroup.groupNm}' 그룹을 탈퇴하였습니다.`,
            type: 'warning',
            action: `/group/${targetGroup.groupCd}`,
          };
        } catch (error) {
          console.error(error);
        }
        break;
      case 'POST_LIKE_NEW':
        try {
          activeUser = (await axios.get(`/user/${data.activeCd}`)).data;
          // targetPost = (await axios.get(`/post/${data.targetCd}`)).data;
          message = {
            text: `${activeUser.userId}(${activeUser.userNm})님이 회원님의 게시물을 좋아합니다.`,
            type: 'success',
            action: `/${userId}/${data.targetCd}`,
          };
        } catch (error) {
          console.error(error);
        }
        break;
      case 'POST_GROUP_NEW':
        try {
          activeGroup = (await axios.get(`/group/?input=${data.activeCd}`)).data;
          // targetPost = (await axios.get(`/post/${data.targetCd}`)).data;
          message = {
            text: `'${activeGroup.groupNm}' 그룹에 게시물이 등록되었습니다.`,
            type: 'info',
            action: `group/${data.activeCd}/${data.targetCd}`,
          };
          console.log(activeUser, targetPost);
        } catch (error) {
          console.error(error);
        }
        break;
      case 'SCHEDULE_MEMBER_INVITE':
        try {
          activeSchedule = (await axios.get(`/schedule/${data.activeCd}`)).data;
          message = { text: `${activeSchedule.scheduleNm} 일정에 회원님이 일정멤버로 초대되었습니다.`, type: 'info' };
          console.log(activeSchedule);
          const { data } = await axios.get(`/notice/accept/${userCd}`);
          onSaveNoticeList(data);
        } catch (error) {
          console.error(error);
        }
        break;
      case 'SCHEDULE_MEMBER_INVITE_NOT':
        try {
          activeUser = (await axios.get(`/user/${data.activeCd}`)).data;
          targetSchedule = (await axios.get(`/schedule/${data.targetCd}`)).data;
          message = {
            text: `${activeUser.userId}(${activeUser.userNm})님이 '${targetSchedule.scheduleNm}' 일정에 일정멤버 초대를 거절하였습니다.`,
            type: 'warning',
          };
        } catch (error) {
          console.error(error);
        }
        break;
      case 'SCHEDULE_MEMBER_ALLOW':
        try {
          activeUser = (await axios.get(`/user/${data.activeCd}`)).data;
          targetSchedule = (await axios.get(`/schedule/${data.targetCd}`)).data;
          message = {
            text: `${activeUser.userId}(${activeUser.userNm})님이 '${targetSchedule.scheduleNm}' 일정에 일정멤버 초대를 수락하였습니다.`,
            type: 'info',
          };
        } catch (error) {
          console.error(error);
        }
        break;
      case 'COMMENT_NEW':
        try {
          activeComment = (await axios.get(`/comment/${data.activeCd}`)).data;
          // targetPost = (await axios.get(`/post/${data.targetCd}`)).data;
          message = {
            text: `${activeComment.userFK.userId}(${activeComment.userFK.userNm})님이 회원님의 게시물에 댓글을 남겼습니다.`,
            type: 'info',
            action: `/${userId}/${data.targetCd}`,
          };
        } catch (error) {
          console.error(error);
        }
        break;
      case 'COMMENT_SUB_NEW':
        try {
          activeComment = (await axios.get(`/comment/${data.activeCd}`)).data;
          // targetPost = (await axios.get(`/post/${data.activeComment.postCd}`)).data;
          message = {
            text: `${activeComment.userFK.userId}(${activeComment.userFK.userNm})님이 회원님의 댓글에 답글을 남겼습니다.`,
            type: 'info',
            action: `/${userId}/${activeComment.postCd}`,
          };
        } catch (error) {
          console.error(error);
        }
        break;
      default:
        console.error(`${data.noticeType} is not setting`);
        break;
    }
    enqueueSnackbar(message.text, {
      variant: message.type,
      autoHideDuration: message.action === undefined ? 3000 : 6000,
      action:
        message.action === undefined ? null : (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              history.push(message.action);
            }}
          >
            이동
          </div>
        ),
    });
  };

  return null;
};

export default WebSocket;
