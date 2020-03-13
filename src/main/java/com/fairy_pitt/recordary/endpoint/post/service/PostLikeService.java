package com.fairy_pitt.recordary.endpoint.post.service;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.PostLikeEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.PostLikeRepository;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostLikeService {
    @Autowired
    PostLikeRepository postLikeRepository;
    @Autowired
    PostRepository postRepository;
    @Autowired
    UserRepository userRepository;

    public Boolean create(Long postCd, String userId){
        PostEntity post = postRepository.findByPostCd(postCd);
        UserEntity user = userRepository.findByUserId(userId);

        PostLikeEntity postLike = new PostLikeEntity();
        postLike.setPostFK(post);
        postLike.setUserFK(user);

        Optional<PostLikeEntity> resultPostLikeEntity = Optional.of(postLikeRepository.save(postLike));
        if (resultPostLikeEntity.isPresent()) return true;
        else return false;
    }

    public Boolean delete(Long postCd, String userId){
        PostEntity post = postRepository.findByPostCd(postCd);
        UserEntity user = userRepository.findByUserId(userId);
        PostLikeEntity postLike = postLikeRepository.findByPostFKAndUserFK(post, user);
        postLikeRepository.delete(postLike);
        if (postLikeRepository.findByPostFKAndUserFK(post, user) != null) return false;
        return true;
    }

    public List<PostEntity> userPostLikeSearch(String userId){
        UserEntity user = userRepository.findByUserId(userId);
        return postLikeRepository.findAllByUserFK(user);
    }

    public List<UserEntity> postLikeUserSearch(Long postCd){
        PostEntity post = postRepository.findByPostCd(postCd);
        return postLikeRepository.findAllByPostFK(post);
    }
}
