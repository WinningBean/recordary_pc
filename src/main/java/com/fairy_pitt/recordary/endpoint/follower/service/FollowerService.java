package com.fairy_pitt.recordary.endpoint.follower.service;

import com.fairy_pitt.recordary.common.entity.FollowerEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.FollowerRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.follower.dto.FollowerSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserListResponseDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.*;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class FollowerService {

    private final UserService userService;
    private final FollowerRepository followerRepository;

    @Transactional
    public Boolean save(String targetId){
        FollowerSaveRequestDto followerSaveRequestDto = FollowerSaveRequestDto.builder()
                .userFK(userService.currentUser())
                .targetFK(userService.findEntity(targetId))
                .build();
        return Optional.ofNullable(followerRepository.save(followerSaveRequestDto.toEntity())).isPresent();
    }

    @Transactional
    public void delete(String targetId){
        FollowerEntity followerEntity = Optional.ofNullable(followerRepository.findByUserFKAndTargetFK(userService.currentUser(), userService.findEntity(targetId)))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 팔로우하지 않았습니다. id = " + targetId));
        followerRepository.delete(followerEntity);
    }

    @Transactional(readOnly = true)
    public List<UserListResponseDto> followerList(String userId){ // 사용자를 팔로우
        List<FollowerEntity> followerEntityList = userService.findEntity(userId).getFollowTarget();
        List<UserEntity> userEntityList = new ArrayList<>();
        for (FollowerEntity followerEntity : followerEntityList){
            String responseId = followerEntity.getUserFK().getUserId();
            userEntityList.add(userService.findEntity(responseId));
        }
        return userEntityList.stream()
                .map(UserListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<UserListResponseDto> followingList(String userId){ // 사용자가 팔로우
        List<FollowerEntity> followerEntityList = userService.findEntity(userId).getFollowUser();
        List<UserEntity> userEntityList = new ArrayList<>();
        for (FollowerEntity followerEntity : followerEntityList){
            String responseId = followerEntity.getTargetFK().getUserId();
            userEntityList.add(userService.findEntity(responseId));
        }
        return userEntityList.stream()
                .map(UserListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Boolean followEachOther(String userId, String targetId){ // 맞팔 상태
        UserEntity user = userService.findEntity(userId);
        UserEntity target = userService.findEntity(targetId);
        FollowerEntity followerEntity = followerRepository.findByUserFKAndTargetFK(user, target);
        if (followerEntity == null) return false;
        return true;
    }

    @Transactional(readOnly = true)
    public List<UserResponseDto> friends(String userId){ // 사용자 친구 리스트 (맞팔)
        List<String> followersId = new ArrayList<>();
        List<String> followingsId = new ArrayList<>();
        for (UserListResponseDto userListResponseDto : followerList(userId)){
            followersId.add(userListResponseDto.getUserId());
        }
        for (UserListResponseDto userListResponseDto : followingList(userId)){
            followingsId.add(userListResponseDto.getUserId());
        }

        if (followersId == null || followingsId == null) return null;
        followersId.retainAll(followingsId);

        List<UserResponseDto> friendList = new ArrayList<>();
        for (String targetId : followersId){
            friendList.add(userService.findById(targetId));
        }
        return friendList; // return UserResponseDto
    }
}
