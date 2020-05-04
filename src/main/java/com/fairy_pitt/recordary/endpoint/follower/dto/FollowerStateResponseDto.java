package com.fairy_pitt.recordary.endpoint.follower.dto;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.FollowerRepository;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Getter
@NoArgsConstructor
public class FollowerStateResponseDto {
    private UserResponseDto targetFK;
    private Boolean userFollowTarget;
    private Boolean targetFollowUser;

    public FollowerStateResponseDto(UserEntity targetFK, Boolean userFollowTarget, Boolean targetFollowUser){
        this.targetFK = new UserResponseDto(targetFK);
        this.userFollowTarget = userFollowTarget;
        this.targetFollowUser = targetFollowUser;
    }
}
