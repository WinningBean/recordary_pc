package com.fairy_pitt.recordary.endpoint.follower.service;

import com.fairy_pitt.recordary.common.entity.FollowerEntity;
import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.FollowerRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.*;

@Service
public class FollowerService {

    @Autowired private UserService userService;
    @Autowired private FollowerRepository followerRepository;
    @Autowired private UserRepository userRepository;

    public Boolean create(UserEntity currentUser, String targetId){
        FollowerEntity follower = new FollowerEntity();
        UserEntity targetUser = userRepository.findByUserId(targetId);

        follower.setUserFK(currentUser);
        follower.setTargetFK(targetUser);

        Optional<FollowerEntity> resultFollowerEntity = Optional.of(followerRepository.save(follower));
        if (resultFollowerEntity.isPresent()) return true;
        else return false;
    }

    public Boolean delete(UserEntity currentUser, String targetId){
        UserEntity target = userRepository.findByUserId(targetId);
        FollowerEntity followerEntity = followerRepository.findByUserFKAndTargetFK(currentUser, target);
        followerRepository.delete(followerEntity);
        return true;
    }

    public List<UserEntity> followers(Long userFK){ // 사용자를 팔로우
        List<FollowerEntity> followerEntityList = userService.find(userFK).getFollowTarget();
        List<UserEntity> followerList = new ArrayList<>();
        for (FollowerEntity followerEntity : followerEntityList){
            followerList.add(followerEntity.getUserFK());
        }
        return followerList;
    }

    public List<UserEntity> following(Long userFK){ // 사용자가 팔로우
        List<FollowerEntity> followerEntityList = userService.find(userFK).getFollowUser();
        List<UserEntity> followingList = new ArrayList<>();
        for (FollowerEntity followerEntity : followerEntityList){
            followingList.add(followerEntity.getTargetFK());
        }
        return followingList;
    }

    public Boolean followEachOther(Long userFK, Long targetFK){ // 맞팔 상태
        UserEntity user = userService.find(userFK);
        UserEntity target = userService.find(targetFK);
        FollowerEntity followerEntity = followerRepository.findByUserFKAndTargetFK(user, target);
        if (followerEntity == null) return false;
        return true;
    }

    public List<UserEntity> friends(Long userFK){ // 사용자 친구 리스트 (맞팔)
        Set<UserEntity> followers = new HashSet<UserEntity>(followers(userFK));
        Set<UserEntity> followings = new HashSet<UserEntity>(following(userFK));

        if (followers == null || followings == null) return null;
        followers.retainAll(followings);
        List<UserEntity> friendsList = new ArrayList<UserEntity>(followers);
        return friendsList;
    }
}
