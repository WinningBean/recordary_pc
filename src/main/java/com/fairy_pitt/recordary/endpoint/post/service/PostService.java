package com.fairy_pitt.recordary.endpoint.post.service;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.repository.PostLikeRepository;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
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

    private final PostLikeRepository postLikeRepository;

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

        mediaService.delete(postEntity.getMediaFK().getMediaCd());
        postRepository.delete(postEntity);
    }

    private List<PostResponseDto> checkCurrentUserLikePost(List<PostResponseDto> postResponseDtoList){
        for (PostResponseDto postResponseDto : postResponseDtoList){
            if (postLikeRepository.findByPostFKAndUserFK(this.findEntity(postResponseDto.getPostCd()),userService.currentUser()) != null){
                postResponseDto.setTrueCurrentUserLikePost();
            }
        }
        return postResponseDtoList;
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> userPost(Long userCd){
        List<PostResponseDto> postResponseDtoList = postRepository.findAllByUserFKOrderByCreatedDateDesc(userService.findEntity(userCd)).stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());

        return checkCurrentUserLikePost(postResponseDtoList);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> groupPost(Long groupCd){
        List<PostResponseDto> postResponseDtoList = postRepository.findAllByGroupFKOrderByCreatedDateDesc(groupService.findEntity(groupCd)).stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());

        return checkCurrentUserLikePost(postResponseDtoList);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> userPostSearch(String searchContent, Long userCd){
        List<PostResponseDto> postResponseDtoList = postRepository.findAllByPostExLikeAndUserFK("%"+searchContent+"%", userService.findEntity(userCd)).stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());

        return checkCurrentUserLikePost(postResponseDtoList);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> groupPostSearch(String searchContent, Long groupCd){
        List<PostResponseDto> postResponseDtoList = postRepository.findAllByPostExLikeAndGroupFK("%"+searchContent+"%", groupService.findEntity(groupCd)).stream()
                .map(PostResponseDto::new)
                .collect(Collectors.toList());

        return checkCurrentUserLikePost(postResponseDtoList);
    }

    @Transactional(readOnly = true)
    public PostEntity findEntity(Long postCd){
        return postRepository.findByPostCd(postCd);
    }

    @Transactional(readOnly = true)
    public PostResponseDto findByCd(Long postCd) {
        PostEntity postEntity = Optional.ofNullable(postRepository.findByPostCd(postCd))
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. code = " + postCd));

        PostResponseDto postResponseDto = new PostResponseDto(postEntity);
        if (postLikeRepository.findByPostFKAndUserFK(postEntity, userService.currentUser()) != null){
            postResponseDto.setTrueCurrentUserLikePost();
        }
        return postResponseDto;
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

        postList = checkCurrentUserLikePost(postList);
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

        while (cdSetList.size() > currentIndex && postPagingList.size() < 10) {
            postPagingList.add(new PostResponseDto(this.findEntity(cdSetList.get(currentIndex))));
            currentIndex++;
        }

        return postPagingList;
    }
}