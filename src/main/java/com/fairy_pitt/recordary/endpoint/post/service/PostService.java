package com.fairy_pitt.recordary.endpoint.post.service;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleService;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.media.service.MediaService;
import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
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

    @Transactional
    public Long update(Long postCd, PostUpdateRequestDto requestDto) {
        PostEntity postEntity = Optional.ofNullable(postRepository.findByPostCd(postCd))
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. code = " + postCd));

        postEntity.update(requestDto.getPostEx(), requestDto.getPostPublicState());
        return postCd;
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
    public List<PostResponseDto> groupPost(Long groupCd){
        return postRepository.findAllByGroupFKOrderByCreatedDateDesc(groupService.findEntity(groupCd)).stream()
                .map(PostResponseDto::new)
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
        List<UserResponseDto> followingList = followerService.followingList(userCd);
        List<GroupResponseDto> groupList = groupService.findUserGroups(userCd);

        List<PostResponseDto> postList = new ArrayList<>();

        List<PostEntity> userPost = postRepository.findAllByUserFKOrderByCreatedDateDesc(userService.findEntity(userCd));
        for (PostEntity post : userPost){
            postList.add(new PostResponseDto(post));
        }

        for (UserResponseDto userResponseDto : followingList){
            List<PostEntity> followingPost = postRepository.findAllByUserFKOrderByCreatedDateDesc(userService.findEntity(userResponseDto.getUserCd()));
            Boolean friendState = followerService.followEachOther(userCd, userResponseDto.getUserCd());
            int publicState = 2;
            if (friendState) publicState = 3;
            for (PostEntity post : followingPost){
                if (post.getPostPublicState() < publicState) postList.add(new PostResponseDto(post));
            }
        }

        for (GroupResponseDto groupResponseDto : groupList){
            List<PostEntity> groupPost = postRepository.findAllByGroupFKOrderByCreatedDateDesc(groupService.findEntity(groupResponseDto.getGroupCd()));
            for (PostEntity post : groupPost){
                postList.add(new PostResponseDto(post));
            }
        }

        Collections.sort(postList);
        return postList;
    }

}