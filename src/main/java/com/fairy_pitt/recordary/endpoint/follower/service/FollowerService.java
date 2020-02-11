package com.fairy_pitt.recordary.endpoint.follower.service;

import com.fairy_pitt.recordary.common.entity.FollowerEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.FollowerRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class FollowerService {

    @Autowired private UserService userService;
    @Autowired private FollowerRepository followerRepository;
    @Autowired private UserRepository userRepository;

    public Boolean create(UserEntity currentUser, Long targetFK){
        FollowerEntity follower = new FollowerEntity();
        follower.setUserFK(currentUser);
        follower.setTargetFK(userService.find(targetFK));
        followerRepository.save(follower);
        return true;
    }

}
