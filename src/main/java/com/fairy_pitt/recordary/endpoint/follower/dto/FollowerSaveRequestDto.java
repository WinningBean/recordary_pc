package com.fairy_pitt.recordary.endpoint.follower.dto;

import com.fairy_pitt.recordary.common.entity.FollowerEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FollowerSaveRequestDto {
    private UserEntity userFK;
    private UserEntity targetFK;

    @Builder
    public FollowerSaveRequestDto(UserEntity userFK, UserEntity targetFK){
        this.userFK = userFK;
        this.targetFK = targetFK;
    }

    public FollowerEntity toEntity(){
        return FollowerEntity.builder()
                .userFK(userFK)
                .targetFK(targetFK)
                .build();
    }
}
