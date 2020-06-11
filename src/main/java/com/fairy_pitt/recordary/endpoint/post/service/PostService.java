package com.fairy_pitt.recordary.endpoint.post.service;

import com.fairy_pitt.recordary.common.entity.MediaEntity;
import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.media.service.MediaService;
import com.fairy_pitt.recordary.endpoint.post.dto.GroupPostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.schedule.dto.ScheduleSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;
    private final FollowerService followerService;
    private final GroupService groupService;
    private final ScheduleService scheduleService;
    private final MediaService mediaService;

    @Transactional
    public Boolean save(PostSaveRequestDto requestDto) {
        PostEntity postEntity = PostEntity.builder()
                .userFK(userService.findEntity(requestDto.getUserCd()))
                .groupFK(groupService.findEntity(requestDto.getGroupCd()))
                .postOriginFK(this.findEntity(requestDto.getPostOriginCd()))
                .scheduleFK(scheduleService.findEntity(requestDto.getScheduleCd()))
                .mediaFK(mediaService.findEntity(requestDto.getMediaCd()))
                .postEx(requestDto.getPostEx())
                .postPublicState(requestDto.getPostPublicState())
                .postStrYMD(requestDto.getPostStrYMD())
                .postEndYMD(requestDto.getPostEndYMD())
                .build();

        return Optional.ofNullable(postRepository.save(postEntity)).isPresent();
    }

    public Boolean saveSchedulePost(ScheduleSaveRequestDto requestDto, Long scheduleCd)
    {
        PostEntity postEntity = PostEntity.builder()
                .userFK(userService.findEntity(requestDto.getUserCd()))
                .groupFK(groupService.findEntity(requestDto.getGroupCd()))
                .scheduleFK(scheduleService.findEntity(scheduleCd))
                .postPublicState(requestDto.getSchedulePublicState())
                .build();

        return Optional.ofNullable(postRepository.save(postEntity)).isPresent();
    }

    @Transactional
    public Long update(Long postCd, PostUpdateRequestDto requestDto) {
        PostEntity postEntity = Optional.ofNullable(postRepository.findByPostCd(postCd))
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. code = " + postCd));

        postEntity.update(requestDto.getPostEx(), requestDto.getPostPublicState());
        return postCd;
    }

    @Transactional
    public Boolean addMedia(Long scheduleCd, Long mediaCd){
        ScheduleEntity scheduleEntity = scheduleService.findEntity(scheduleCd);
        PostEntity postEntity = postRepository.findByScheduleFK(scheduleEntity);
        MediaEntity mediaEntity = mediaService.findEntity(mediaCd);
        postEntity.addMedea(mediaEntity);
        return true;
    }

    @Transactional
    public void delete (Long postCd) {
        PostEntity postEntity = Optional.ofNullable(postRepository.findByPostCd(postCd))
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. code = " + postCd));

        postRepository.delete(postEntity);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> userPost(Long userCd){
        return postRepository.findAllByUserFKOrderByCreatedDateDesc(userService.findEntity(userCd)).stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<GroupPostResponseDto> groupPost(Long groupCd){
        return postRepository.findAllByGroupFKOrderByCreatedDateDesc(groupService.findEntity(groupCd)).stream()
                .map(GroupPostResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> userPostSearch(String searchContent, Long userCd){
        return postRepository.findAllByPostExLikeAndUserFK("%"+searchContent+"%", userService.findEntity(userCd)).stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> groupPostSearch(String searchContent, Long groupCd){
        return postRepository.findAllByPostExLikeAndGroupFK("%"+searchContent+"%", groupService.findEntity(groupCd)).stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PostEntity findEntity(Long postCd){
        return postRepository.findByPostCd(postCd);
    }

    @Transactional(readOnly = true)
    public PostResponseDto findByCd(Long postCd) {
        PostEntity postEntity = Optional.ofNullable(postRepository.findByPostCd(postCd))
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. code = " + postCd));

        return new PostResponseDto(postEntity);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> findAllDesc() {
        return postRepository.findAllByOrderByCreatedDateDesc().stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> timeLinePostList(Long userCd){

        List<PostResponseDto> postList = new ArrayList<>();

        List<PostEntity> userPost = postRepository.findAllByUserFKOrderByCreatedDateDesc(userService.findEntity(userCd));
        for (PostEntity post : userPost){
            postList.add(new PostResponseDto(post));
        }

        for (UserResponseDto userResponseDto : followerService.followingList(userCd)){
            int publicState = followerService.checkPublicStateToTarget(userCd, userResponseDto.getUserCd());
            List<PostEntity> followingPost = postRepository.findAllByUserFKAndGroupFKAndPostPublicStateLessThanEqualOrderByCreatedDateDesc(userService.findEntity(userResponseDto.getUserCd()), null, publicState);
            for (PostEntity post : followingPost){
                postList.add(new PostResponseDto(post));
            }
        }

        for (GroupResponseDto groupResponseDto : groupService.findUserGroups(userCd)){
            List<PostEntity> groupPost = postRepository.findAllByGroupFKOrderByCreatedDateDesc(groupService.findEntity(groupResponseDto.getGroupCd()));
            for (PostEntity post : groupPost){
                postList.add(new PostResponseDto(post));
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

        while (cdSetList.size() > currentIndex && postPagingList.size() < 5) {
            postPagingList.add(new PostResponseDto(this.findEntity(cdSetList.get(currentIndex))));
            currentIndex++;
        }

        return postPagingList;
    }
}