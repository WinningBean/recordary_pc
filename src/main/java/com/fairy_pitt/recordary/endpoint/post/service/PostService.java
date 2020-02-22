package com.fairy_pitt.recordary.endpoint.post.service;

import com.fairy_pitt.recordary.common.entity.FollowerEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PostService {
    @Autowired private PostRepository postRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private FollowerRepository followerRepository;
    @Autowired private GroupMemberRepository groupMemberRepository;

    public Boolean create(UserEntity currentUser, GroupEntity groupEntity, Map<String, Object> postMap){
        if (currentUser == null || postMap == null) return false;

        PostEntity post = new PostEntity();
        post.setUserFK(currentUser);
        if (groupEntity == null) post.setGroupFK(null);
        else post.setGroupFK(groupEntity);
        post.setPostEx((String)postMap.get("post_ex"));
        post.setPostPublicState((int)postMap.get("post_pb_st"));
        post.setPostStrYMD((String)postMap.get("post_str_ymd"));
        post.setPostEndYMD((String)postMap.get("post_end_ymd"));

        Optional<PostEntity> resultPostEntity = Optional.of(postRepository.save(post));
        if (resultPostEntity.isPresent()) return true;
        else return false;
    }

    public Boolean update(PostEntity postEntity){
        Long postCd = postEntity.getPostCd();
        PostEntity updatePost = postRepository.findByPostCd(postCd);
        if (updatePost == null) return false;

        updatePost.setPostEx(postEntity.getPostEx());
        updatePost.setPostPublicState(postEntity.getPostPublicState());
        postRepository.save(updatePost);
        return true;
    }

    public List<PostEntity> timeLine(UserEntity userEntity){ // 수정 필요
        List<FollowerEntity> followerEntityList = followerRepository.findAllByUserFK(userEntity);
        List<GroupEntity> groupEntityList = groupMemberRepository.findAllByUserCodeFK(userEntity);

        List<PostEntity> postList = new ArrayList<>();
        for (FollowerEntity follower : followerEntityList){
            List<PostEntity> userPost = postRepository.findAllByUserFK(follower.getTargetFK());
            for (PostEntity post : userPost){
                postList.add(post);
            }
        }
        for (GroupEntity group : groupEntityList){
            List<PostEntity> groupPost = postRepository.findAllByGroupFK(group);
            for (PostEntity post : groupPost){
                postList.add(post);
            }
        }

        return postList;
    }

    public List<PostEntity> userPost(UserEntity userEntity){
        return postRepository.findAllByUserFK(userEntity);
    }

    public List<PostEntity> groupPost(GroupEntity groupEntity){
        return postRepository.findAllByGroupFK(groupEntity);
    }

    public Boolean delete(Long postCd){
        PostEntity postEntity = postRepository.findByPostCd(postCd);
        postRepository.delete(postEntity);
        if (postRepository.findByPostCd(postCd) != null) return false;
        return true;
    }

    public List<PostEntity> userPostSearch(String searchContent, UserEntity userEntity){
        return postRepository.findAllByPostExLikeAndUserFK("%"+searchContent+"%", userEntity);
    }

    public List<PostEntity> groupPostSearch(String searchContent, GroupEntity groupEntity){
        return postRepository.findAllByPostExLikeAndGroupFK("%"+searchContent+"%", groupEntity);
    }
}