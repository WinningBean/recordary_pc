package com.fairy_pitt.recordary.endpoint.post.service;

import com.fairy_pitt.recordary.common.domain.*;
import com.fairy_pitt.recordary.common.repository.PostLikeRepository;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.common.repository.PostScheduleShareRepository;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.media.service.MediaService;
import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Transactional
@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;
    private final FollowerService followerService;
    private final GroupService groupService;
    private final GroupMemberService groupMemberService;
    private final ScheduleService scheduleService;
    private final MediaService mediaService;

    private final PostLikeRepository postLikeRepository;
    private final PostScheduleShareRepository postScheduleShareRepository;

    @Transactional
    public Long save(PostSaveRequestDto requestDto) {
        PostEntity postEntity = PostEntity.builder()
                .userFK(userService.findEntity(requestDto.getUserCd()))
                .groupFK(groupService.findEntity(requestDto.getGroupCd()))
                .postOriginFK(this.findEntity(requestDto.getPostOriginCd()))
                .scheduleFK(scheduleService.findEntity(requestDto.getScheduleCd()))
                .mediaFK(mediaService.findEntity(requestDto.getMediaCd()))
                .postEx(requestDto.getPostEx())
                .postPublicState(requestDto.getPostPublicState())
                .postScheduleShareState(requestDto.getPostScheduleShareState())
                .build();

        return postRepository.save(postEntity).getPostCd();
    }

    @Transactional
    public Long update(Long postCd, PostUpdateRequestDto requestDto) {
        PostEntity postEntity = Optional.ofNullable(postRepository.findByPostCd(postCd))
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. code = " + postCd));

        postEntity.update(groupService.findEntity(requestDto.getGroupCd()),
                scheduleService.findEntity(requestDto.getScheduleCd()),
                mediaService.findEntity(requestDto.getMediaCd()),
                requestDto.getPostEx(),
                requestDto.getPostPublicState());
        return postCd;
    }

    @Transactional
    public Boolean addMedia(Long scheduleCd, Long mediaCd){
        ScheduleEntity scheduleEntity = scheduleService.findEntity(scheduleCd);
        MediaEntity mediaEntity = mediaService.findEntity(mediaCd);
        PostEntity postEntity = postRepository.findByScheduleFK(scheduleEntity);
        postEntity.update(postEntity.getGroupFK(),
                scheduleEntity,
                mediaEntity,
                postEntity.getPostEx(),
                postEntity.getPostPublicState());
        return true;
    }

    @Transactional
    public Boolean delete (Long postCd) {
        PostEntity postEntity = Optional.ofNullable(postRepository.findByPostCd(postCd))
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. code = " + postCd));

        for (PostScheduleShareEntity postScheduleShareEntity : postScheduleShareRepository.findAllByPostFK(postEntity)){
            postScheduleShareRepository.delete(postScheduleShareEntity);
        }
        if (postEntity.getScheduleFK() != null) scheduleService.delete(postEntity.getScheduleFK().getScheduleCd());
        if (postEntity.getMediaFK() != null) mediaService.delete(postEntity.getMediaFK().getMediaCd());
        postRepository.delete(postEntity);
        return !Optional.ofNullable(this.findEntity(postCd)).isPresent();
    }

    private PostResponseDto checkCurrentUserLikePost(PostResponseDto postResponseDto) {
        if (postLikeRepository.findByPostFKAndUserFK(this.findEntity(postResponseDto.getPostCd()), userService.currentUser()) != null) {
            postResponseDto.setTrueCurrentUserLikePost();
        }
        return postResponseDto;
    }

    private PostResponseDto checkCurrentUserShowPost(PostResponseDto postResponseDto){
        int publicState = followerService.checkPublicStateToTarget(userService.currentUserCd(), postResponseDto.getUserFK().getUserCd());
        if (postResponseDto.getPostPublicState() > publicState) postResponseDto.setFalseCurrentUserShowPost();
        return postResponseDto;
    }

    private List<PostResponseDto> checkCurrentUserForPost(List<PostEntity> postEntityList){
        List<PostResponseDto> postResponseDtoList = new ArrayList<>();
        for (PostEntity postEntity : postEntityList){
            int publicState = followerService.checkPublicStateToTarget(userService.currentUserCd(), postEntity.getUserFK().getUserCd());
            if (postEntity.getPostPublicState() <= publicState){
                postResponseDtoList.add(checkCurrentUserLikePost(new PostResponseDto(postEntity)));
            }
        }
        return postResponseDtoList;
    }

    private List<PostResponseDto> checkCurrentUserForPost(List<PostEntity> postEntityList, int publicState){
        List<PostResponseDto> postResponseDtoList = new ArrayList<>();
        for (PostEntity postEntity : postEntityList){
            if (postEntity.getPostPublicState() <= publicState){
                postResponseDtoList.add(checkCurrentUserLikePost(new PostResponseDto(postEntity)));
            }
        }
        return postResponseDtoList;
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> userPost(Long userCd){
        List<PostEntity> postEntityList = new ArrayList<>(postRepository.findAllByUserFKOrderByCreatedDateDesc(userService.findEntity(userCd)));

        return checkCurrentUserForPost(postEntityList);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> pagingUserPost(Long userCd, Long lastPostCd){

        Map<Long, LocalDateTime> postMap = new HashMap<>();

        for (PostResponseDto postResponseDto : userPost(userCd)){
            postMap.put(postResponseDto.getPostCd(), postResponseDto.getModifiedDate());
        }

        return sortPagingPost(postMap, lastPostCd);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> groupPost(Long groupCd){
        List<PostEntity> postEntityList = new ArrayList<>(postRepository.findAllByGroupFKOrderByCreatedDateDesc(groupService.findEntity(groupCd)));

        int publicState = 0;
        if (groupMemberService.findEntity(groupCd, userService.currentUserCd()) != null) publicState = 3;

        return checkCurrentUserForPost(postEntityList, publicState);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> pagingGroupPost(Long groupCd, Long lastPostCd){

        Map<Long, LocalDateTime> postMap = new HashMap<>();

        for (PostResponseDto postResponseDto : groupPost(groupCd)){
            postMap.put(postResponseDto.getPostCd(), postResponseDto.getModifiedDate());
        }

        return sortPagingPost(postMap, lastPostCd);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> userPostSearch(String searchContent, Long userCd){
        List<PostEntity> postEntityList = new ArrayList<>(postRepository.findAllByPostExLikeAndUserFK("%" + searchContent + "%", userService.findEntity(userCd)));

        return checkCurrentUserForPost(postEntityList);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> groupPostSearch(String searchContent, Long groupCd){
        List<PostEntity> postEntityList = new ArrayList<>(postRepository.findAllByPostExLikeAndGroupFK("%" + searchContent + "%", groupService.findEntity(groupCd)));

        int publicState = 0;
        if (groupMemberService.findEntity(groupCd, userService.currentUserCd()) != null) publicState = 3;

        return checkCurrentUserForPost(postEntityList, publicState);
    }

    @Transactional(readOnly = true)
    public PostEntity findEntity(Long postCd){
        return postRepository.findByPostCd(postCd);
    }

    @Transactional(readOnly = true)
    public PostResponseDto findByCd(Long postCd) {
        PostEntity postEntity = Optional.ofNullable(postRepository.findByPostCd(postCd))
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. code = " + postCd));

        return checkCurrentUserShowPost(checkCurrentUserLikePost(new PostResponseDto(postEntity)));
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> timeLinePostList(Long userCd){

        List<PostResponseDto> postList = new ArrayList<>();

        List<PostEntity> userPost = postRepository.findAllByUserFKAndGroupFKOrderByCreatedDateDesc(userService.findEntity(userCd), null);
        for (PostEntity post : userPost){
            postList.add(checkCurrentUserLikePost(new PostResponseDto(post)));
        }

        for (UserResponseDto userResponseDto : followerService.followingList(userCd)){
            int publicState = followerService.checkPublicStateToTarget(userCd, userResponseDto.getUserCd());
            List<PostEntity> followingPost = postRepository.findAllByUserFKAndGroupFKAndPostPublicStateLessThanEqualOrderByCreatedDateDesc(userService.findEntity(userResponseDto.getUserCd()), null, publicState);
            for (PostEntity post : followingPost){
                postList.add(checkCurrentUserLikePost(new PostResponseDto(post)));
            }
        }

        for (GroupResponseDto groupResponseDto : groupService.findUserGroups(userCd)){
            List<PostEntity> groupPost = postRepository.findAllByGroupFKOrderByCreatedDateDesc(groupService.findEntity(groupResponseDto.getGroupCd()));
            for (PostEntity post : groupPost){
                postList.add(checkCurrentUserLikePost(new PostResponseDto(post)));
            }
        }

        Collections.sort(postList);
        return postList;
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> pagingTimeLinePostList(Long userCd, Long lastPostCd){

        Map<Long, LocalDateTime> postMap = new HashMap<>();

        for (PostResponseDto postResponseDto : timeLinePostList(userCd)){
            postMap.put(postResponseDto.getPostCd(), postResponseDto.getModifiedDate());
        }

        return sortPagingPost(postMap, lastPostCd);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> sortPagingPost(Map<Long, LocalDateTime> postMap, Long lastPostCd){
        List<Long> cdSetList = new ArrayList<>(postMap.keySet());
        Collections.sort(cdSetList, new Comparator<Long>() {
            @Override
            public int compare(Long o1, Long o2) {
                return postMap.get(o2).compareTo(postMap.get(o1));
            }
        });

        int currentIndex;
        if (lastPostCd == null) currentIndex = 0;
        else currentIndex = cdSetList.indexOf(lastPostCd) + 1;

        List<PostResponseDto> postPagingList = new ArrayList<>();

        while (cdSetList.size() > currentIndex && postPagingList.size() < 10) {
            postPagingList.add(checkCurrentUserLikePost(new PostResponseDto(this.findEntity(cdSetList.get(currentIndex)))));
            currentIndex++;
        }

        return postPagingList;
    }
}