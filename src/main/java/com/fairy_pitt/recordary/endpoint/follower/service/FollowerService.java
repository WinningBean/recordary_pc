package com.fairy_pitt.recordary.endpoint.follower.service;

import com.fairy_pitt.recordary.common.entity.FollowerEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.FollowerRepository;
import com.fairy_pitt.recordary.endpoint.follower.dto.FollowerRequestDto;
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
    public Boolean save(FollowerRequestDto requestDto) {
        FollowerEntity followerEntity = FollowerEntity.builder()
                .userFK(userService.findEntity(requestDto.getUserCd()))
                .targetFK(userService.findEntity(requestDto.getTargetCd()))
                .build();

        return Optional.ofNullable(followerRepository.save(followerEntity)).isPresent();
    }

    @Transactional
    public Boolean delete(FollowerRequestDto requestDto) {
        FollowerEntity followerEntity = Optional.ofNullable(this.findEntity(requestDto.getUserCd(), requestDto.getTargetCd()))
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 팔로우하지 않았습니다. cd = " + requestDto.getTargetCd()));
        followerRepository.delete(followerEntity);
        return !Optional.ofNullable(this.findEntity(followerEntity.getUserFK().getUserCd(), followerEntity.getTargetFK().getUserCd())).isPresent();
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
        if (this.findEntity(userCd, targetCd) != null && this.findEntity(targetCd, userCd) != null) return true;
        return false;
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
        return friendList;
    }

    @Transactional(readOnly = true)
    public List<FollowerStateResponseDto> followState(String findNm) {
        List<FollowerStateResponseDto> followerStateResponseDtoList = new ArrayList<>();
        List<UserResponseDto> userResponseDtoList = userService.findNmUser(findNm);

        Long userCd = userService.currentUserCd();
        for (UserResponseDto targetFK : userResponseDtoList) {
            followerStateResponseDtoList.add(new FollowerStateResponseDto(
                    userService.findEntity(targetFK.getUserCd()),
                    Optional.ofNullable(this.findEntity(userCd, targetFK.getUserCd())).isPresent(),
                    Optional.ofNullable(this.findEntity(targetFK.getUserCd(), userCd)).isPresent()
            ));
        }
        return followerStateResponseDtoList;
    }

    @Transactional(readOnly = true)
    public int checkPublicStateToTarget(Long userCd, Long targetCd) { // target에 따른 publicState
        if (userCd == null) return 0; // 로그아웃 사용자

        if (userCd.equals(targetCd)) {
            return 3;
        } else if (followEachOther(userCd, targetCd)) {
            return 2;
        } else if (this.findEntity(userCd, targetCd) != null) {
            return 1;
        } else return 0;
    }

    @Transactional(readOnly = true)
    public FollowerEntity findEntity(Long userCd, Long targetCd) {
        UserEntity user = userService.findEntity(userCd);
        UserEntity target = userService.findEntity(targetCd);
        return followerRepository.findByUserFKAndTargetFK(user, target);
    }
}

