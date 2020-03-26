package com.fairy_pitt.recordary.endpoint.post.service;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.PostTagEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.common.repository.PostTagRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.post.dto.PostListResponseDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserListResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class PostTagService {

    private final PostTagRepository postTagRepository;
    private final PostService postService;
    private final UserService userService;

    @Transactional
    public Boolean save(Long postCd, String userId){
        PostTagEntity postTagEntity = PostTagEntity.builder()
                .postFK(postService.findEntity(postCd))
                .userFK(userService.findEntity(userId))
                .build();

        return Optional.ofNullable(postTagRepository.save(postTagEntity)).isPresent();
    }

    @Transactional
    public void delete(Long postCd, String userId){
        PostTagEntity postTagEntity = Optional.ofNullable(
                postTagRepository.findByPostFKAndUserFK(postService.findEntity(postCd), userService.findEntity(userId)))
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물에 태그되어 있지 않습니다. post_code = " + postCd + ", user_id = " + userId));
        postTagRepository.delete(postTagEntity);
    }

    @Transactional(readOnly = true)
    public List<UserListResponseDto> postTagUser(Long postCd){
        PostEntity postEntity = postService.findEntity(postCd);
        List<UserEntity> userEntityList = new ArrayList<>();
        for (PostTagEntity postTagEntity : postTagRepository.findAllByPostFK(postEntity)){
            userEntityList.add(postTagEntity.getUserFK());
        }
        return userEntityList.stream()
                .map(UserListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostListResponseDto> userTagPost(String userId){
        UserEntity userEntity = userService.findEntity(userId);
        List<PostEntity> postEntityList = new ArrayList<>();
        for (PostTagEntity postTagEntity : postTagRepository.findAllByUserFK(userEntity)){
            postEntityList.add(postTagEntity.getPostFK());
        }
        return postEntityList.stream()
                .map(PostListResponseDto::new)
                .collect(Collectors.toList());
    }
}
