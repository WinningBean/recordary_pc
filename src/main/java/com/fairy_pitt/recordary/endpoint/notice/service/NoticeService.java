package com.fairy_pitt.recordary.endpoint.notice.service;

import com.fairy_pitt.recordary.common.domain.*;
import com.fairy_pitt.recordary.common.repository.*;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.notice.dto.NoticeDto;
import com.fairy_pitt.recordary.endpoint.notice.dto.NoticePageDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class NoticeService {

    private final FollowerService followerService;
    private final UserService userService;

    private final GroupRepository groupRepository;
    private final GroupApplyRepository groupApplyRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final PostRepository postRepository;
    private final ScheduleRepository scheduleRepository;
    private final CommentRepository commentRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendNotice(NoticeDto noticeDto){
        messagingTemplate.convertAndSend(checkNoticeDestination(noticeDto), noticeDto);
    }

    private String checkNoticeDestination(NoticeDto noticeDto){
        NoticeType noticeType = noticeDto.getNoticeType();
        Long ownerCd;

        if (noticeType == NoticeType.FOLLOW_NEW){
            return getNoticeDestination(noticeDto.getTargetCd());
        }
        else if (noticeType == NoticeType.GROUP_APPLY_COME){
            ownerCd = groupRepository.findByGroupCd(noticeDto.getTargetCd()).getGMstUserFK().getUserCd();
            return getNoticeDestination(ownerCd);
        }
        else if (noticeType == NoticeType.GROUP_APPLY_INVITE){
            return getNoticeDestination(noticeDto.getTargetCd());
        }
        else if (noticeType == NoticeType.GROUP_APPLY_COME_NOT){
            return getNoticeDestination(noticeDto.getTargetCd());
        }
        else if (noticeType == NoticeType.GROUP_APPLY_INVITE_NOT){
            ownerCd = groupRepository.findByGroupCd(noticeDto.getTargetCd()).getGMstUserFK().getUserCd();
            return getNoticeDestination(ownerCd);
        }
        else if (noticeType == NoticeType.GROUP_MEMBER_ALLOW){
            return getNoticeDestination(noticeDto.getTargetCd());
        }
        else if (noticeType == NoticeType.GROUP_MEMBER_NEW){
            ownerCd = groupRepository.findByGroupCd(noticeDto.getTargetCd()).getGMstUserFK().getUserCd();
            return getNoticeDestination(ownerCd);
        }
        else if (noticeType == NoticeType.GROUP_MEMBER_AWAY){
            ownerCd = groupRepository.findByGroupCd(noticeDto.getTargetCd()).getGMstUserFK().getUserCd();
            return getNoticeDestination(ownerCd);
        }
        else if (noticeType == NoticeType.POST_LIKE_NEW){
            ownerCd = postRepository.findByPostCd(noticeDto.getTargetCd()).getUserFK().getUserCd();
            return getNoticeDestination(ownerCd);
        }
        else if (noticeType == NoticeType.POST_GROUP_NEW){
            GroupEntity groupEntity = groupRepository.findByGroupCd(noticeDto.getActiveCd());
            UserEntity userEntity = postRepository.findByPostCd(noticeDto.getTargetCd()).getUserFK();

            for (GroupMemberEntity groupMemberEntity : groupEntity.getMembers()){
                ownerCd = groupMemberEntity.getUserFK().getUserCd();
                if (userEntity.getUserCd() != ownerCd) {
                    messagingTemplate.convertAndSend(getNoticeDestination(ownerCd));
                }
            }
            return null;
        }
        else if (noticeType == NoticeType.SCHEDULE_MEMBER_INVITE){
            return getNoticeDestination(noticeDto.getTargetCd());
        }
        else if (noticeType == NoticeType.SCHEDULE_MEMBER_INVITE_NOT){
            ownerCd = scheduleRepository.findByScheduleCd(noticeDto.getTargetCd()).getUserFk().getUserCd();
            return getNoticeDestination(ownerCd);
        }
        else if (noticeType == NoticeType.SCHEDULE_MEMBER_ALLOW){
            ownerCd = scheduleRepository.findByScheduleCd(noticeDto.getTargetCd()).getUserFk().getUserCd();
            return getNoticeDestination(ownerCd);
        }
        else if (noticeType == NoticeType.COMMENT_NEW){
            ownerCd = postRepository.findByPostCd(noticeDto.getTargetCd()).getUserFK().getUserCd();
            return getNoticeDestination(ownerCd);
        }
        else if (noticeType == NoticeType.COMMENT_SUB_NEW){
            ownerCd = commentRepository.findByCommentCd(noticeDto.getTargetCd()).getCommentUserFK().getUserCd();
            return getNoticeDestination(ownerCd);
        }

        return null;
    }

    private String getNoticeDestination(Long userCd) {
        return "/topic/user/" + userCd;
    }

    public void sendTimeLine(Long postCd){
        PostEntity postEntity = postRepository.findByPostCd(postCd);
        PostResponseDto postResponseDto = new PostResponseDto(postEntity);

        GroupEntity groupEntity = postEntity.getGroupFK();
        UserEntity userEntity = postEntity.getUserFK();

        Long ownerCd;

        if (groupEntity != null){
            for (GroupMemberEntity groupMemberEntity : groupMemberRepository.findAllByGroupFK(groupEntity)){
                ownerCd = groupMemberEntity.getUserFK().getUserCd();
                messagingTemplate.convertAndSend(getTimeLineDestination(ownerCd),postResponseDto);
            }
        } else {
            for (FollowerEntity followerEntity : userEntity.getFollowTarget()) {
                ownerCd = followerEntity.getUserFK().getUserCd();
                int publicState = followerService.checkPublicStateToTarget(ownerCd, userEntity.getUserCd());
                if (postEntity.getPostPublicState() <= publicState) {
                    messagingTemplate.convertAndSend(getTimeLineDestination(ownerCd), postResponseDto);
                }
            }
        }
    }

    private String getTimeLineDestination(Long userCd) {
        return "/queue/timeLine/" + userCd;
    }

    public List<NoticePageDto> noticeSort(List<NoticePageDto> responseDto)
    {
        responseDto.sort(Comparator.comparing(NoticePageDto::getCreateTime).reversed());
        return  responseDto;
    }
}
