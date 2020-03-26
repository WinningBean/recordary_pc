package com.fairy_pitt.recordary.endpoint.post.service;

import com.fairy_pitt.recordary.common.entity.FollowerEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.*;
import com.fairy_pitt.recordary.endpoint.Schedule.Service.ScheduleService;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.post.dto.PostListResponseDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;
    private final GroupService groupService;
    private final ScheduleService scheduleService;
    private final FollowerService followerService;

    @Transactional
    public Boolean save(PostSaveRequestDto requestDto) {
        PostEntity postEntity = PostEntity.builder()
                .userFK(userService.findEntity(requestDto.getUserId()))
                .groupFK(groupService.findEntity(requestDto.getGroupCd()))
                .postOriginFK(this.findEntity(requestDto.getPostOriginCd()))
                .scheduleFK(scheduleService.findEntity(requestDto.getScheduleCd()))
                //.mediaFK()
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
    public List<PostListResponseDto> userPost(String userId){
        return postRepository.findAllByUserFKOrderByCreatedDateDesc(userService.findEntity(userId)).stream()
                .map(PostListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostListResponseDto> groupPost(Long groupCd){
        return postRepository.findAllByGroupFKOrderByCreatedDateDesc(groupService.findEntity(groupCd)).stream()
                .map(PostListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostListResponseDto> userPostSearch(String searchContent, String userId){
        return postRepository.findAllByPostExLikeAndUserFK("%"+searchContent+"%", userService.findEntity(userId)).stream()
                .map(PostListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostListResponseDto> groupPostSearch(String searchContent, Long groupCd){
        return postRepository.findAllByPostExLikeAndGroupFK("%"+searchContent+"%", groupService.findEntity(groupCd)).stream()
                .map(PostListResponseDto::new)
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
    public List<PostListResponseDto> findAllDesc() {
        return postRepository.findAllByOrderByCreatedDateDesc().stream()
                .map(PostListResponseDto::new)
                .collect(Collectors.toList());
    }

//    public List<PostListResponseDto> timeLine(String userId){ // 수정 필요
//        List<UserResponseDto> followingList = followerService.followingList(userId);
//        List<GroupEntity> groupEntityList = null;
//
//        List<PostEntity> postList = new ArrayList<>();
//        for (UserResponseDto userResponseDto : followingList){
//            List<PostEntity> userPost = postRepository.findAllByUserFKOrderByCreatedDateDesc(userService.findEntity(userResponseDto.getUserId()));
//            for (PostEntity post : userPost){
//                postList.add(post);
//            }
//        }
//        for (GroupEntity group : groupEntityList){
//            List<PostEntity> groupPost = postRepository.findAllByGroupFK(group);
//            for (PostEntity post : groupPost){
//                postList.add(post);
//            }
//        }
//
//        return postList;
//    }

}