package com.fairy_pitt.recordary.endpoint.follower.dto;

import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FollowerStateResponseDto {
    private UserResponseDto userInfo;
    private Boolean userFollowTarget;
    private Boolean targetFollowUser;

    public FollowerStateResponseDto(UserEntity targetFK, Boolean userFollowTarget, Boolean targetFollowUser){
        this.userInfo = new UserResponseDto(targetFK);
        this.userFollowTarget = userFollowTarget;
        this.targetFollowUser = targetFollowUser;
    }
}
