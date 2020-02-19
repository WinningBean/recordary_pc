package com.fairy_pitt.recordary.endpoint.post.service;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.PostTagEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.common.repository.PostTagRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostTagService {
    @Autowired private PostTagRepository postTagRepository;
    @Autowired private PostRepository postRepository;
    @Autowired private UserRepository userRepository;

    public Boolean create(Long postFK, Long userFK){
        PostEntity post = postRepository.findByPostCd(postFK);
        UserEntity user = userRepository.findByUserCd(userFK);

        PostTagEntity postTag = new PostTagEntity();
        postTag.setPostFK(post);
        postTag.setUserFK(user);

        Optional<PostTagEntity> resultPostTag = Optional.of(postTagRepository.save(postTag));
        if (resultPostTag.isPresent()) return true;
        else return false;
    }
