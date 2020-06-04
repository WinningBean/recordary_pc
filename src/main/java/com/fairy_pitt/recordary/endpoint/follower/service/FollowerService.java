package com.fairy_pitt.recordary.endpoint.follower.service;

import com.fairy_pitt.recordary.common.entity.FollowerEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.FollowerRepository;
import com.fairy_pitt.recordary.endpoint.follower.dto.FollowerSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.follower.dto.FollowerStateResponseDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@RequiredArgsConstructor
@Service
public class FollowerService {

    private final UserService userService;
    private final FollowerRepository followerRepository;

    @Transactional
    public Boolean save(Long targetCd) {
        UserEntity currentUser = userService.currentUser();
        if (currentUser == null) return false;
        FollowerSaveRequestDto followerSaveRequestDto = FollowerSaveRequestDto.builder()
                .userFK(currentUser)
                .targetFK(userService.findEntity(targetCd))
                .build();
        return Optional.ofNullable(followerRepository.save(followerSaveRequestDto.toEntity())).isPresent();
    }

    @Transactional
    public Boolean delete(Long targetCd) {
        FollowerEntity followerEntity = Optional.ofNullable(followerRepository.findByUserFKAndTargetFK(userService.currentUser(), userService.findEntity(targetCd)))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 팔로우하지 않았습니다. cd = " + targetCd));
        followerRepository.delete(followerEntity);
        return !Optional.ofNullable(followerRepository.findByUserFKAndTargetFK(followerEntity.getUserFK(), followerEntity.getTargetFK())).isPresent();
    }

    @Transactional(readOnly = true)
    public List<UserResponseDto> followerList(Long userCd) { // 사용자를 팔로우
        List<FollowerEntity> followerEntityList = userService.findEntity(userCd).getFollowTarget();
        List<UserEntity> userEntityList = new ArrayList<>();
        for (FollowerEntity followerEntity : followerEntityList) {
            String responseId = followerEntity.getUserFK().getUserId();
            userEntityList.add(userService.findEntity(responseId));
        }
        return userEntityList.stream()
                .map(UserResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<UserResponseDto> followingList(Long userCd) { // 사용자가 팔로우
        List<FollowerEntity> followerEntityList = userService.findEntity(userCd).getFollowUser();
        List<UserEntity> userEntityList = new ArrayList<>();
        for (FollowerEntity followerEntity : followerEntityList) {
            Long responseCd = followerEntity.getTargetFK().getUserCd();
            userEntityList.add(userService.findEntity(responseCd));
        }
        return userEntityList.stream()
                .map(UserResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Boolean followEachOther(Long userCd, Long targetCd) { // 맞팔 상태
        UserEntity user = userService.findEntity(userCd);
        UserEntity target = userService.findEntity(targetCd);
        FollowerEntity followerEntity = followerRepository.findByUserFKAndTargetFK(user, target);
        if (followerEntity == null) return false;
        return true;
    }

    @Transactional(readOnly = true)
    public List<UserResponseDto> friends(Long userCd) { // 사용자 친구 리스트 (맞팔)
        List<String> followersId = new ArrayList<>();
        List<String> followingsId = new ArrayList<>();
        for (UserResponseDto userListResponseDto : followerList(userCd)) {
            followersId.add(userListResponseDto.getUserId());
        }
        for (UserResponseDto userListResponseDto : followingList(userCd)) {
            followingsId.add(userListResponseDto.getUserId());
        }

        if (followersId == null || followingsId == null) return null;
        followersId.retainAll(followingsId);

        List<UserResponseDto> friendList = new ArrayList<>();
        for (String targetId : followersId) {
            friendList.add(userService.findById(targetId));
        }
        return friendList; // return UserResponseDto
    }

    @Transactional(readOnly = true)
    public List<FollowerStateResponseDto> followState(String findNm) {
        List<FollowerStateResponseDto> followerStateResponseDtoList = new ArrayList<>();
        List<UserResponseDto> userResponseDtoList = userService.findNmUser(findNm);

        UserEntity userFK = userService.currentUser();
        for (UserResponseDto targetFK : userResponseDtoList) {
            UserEntity targetUser = userService.findEntity(targetFK.getUserCd());
            followerStateResponseDtoList.add(new FollowerStateResponseDto(
                    targetUser,
                    Optional.ofNullable(followerRepository.findByUserFKAndTargetFK(userFK, targetUser)).isPresent(),
                    Optional.ofNullable(followerRepository.findByUserFKAndTargetFK(targetUser, userFK)).isPresent()
            ));
        }
        return followerStateResponseDtoList;
    }

    @Transactional
    public int checkUserState(Long targetCd) {  //user - target 관계 확인
       Long userCd = userService.currentUserCd();
        //Long userCd = Long.parseLong("2");

        if (userCd.equals(targetCd)) {
            return 3;
        } else if (followEachOther(userCd, targetCd)) {
            return 2;
        } else if (findByUserFKAndTargetFK(userCd, targetCd)) {
            return 1;
        } else return 0;
    }

    private Boolean findByUserFKAndTargetFK(Long userCd, Long targetCd) {
        UserEntity user = userService.findEntity(userCd);
        UserEntity target = userService.findEntity(targetCd);
        return Optional.ofNullable(followerRepository.findByUserFKAndTargetFK(user, target)).isPresent();
    }
}

