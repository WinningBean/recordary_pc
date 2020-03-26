package com.fairy_pitt.recordary.endpoint.user.dto;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserResponseDto {
    private String userId;
    private String userNm;
    private String userEx;

    public UserResponseDto(UserEntity userEntity){
        this.userId = userEntity.getUserId();
        this.userNm = userEntity.getUserNm();
        this.userEx = userEntity.getUserEx();
    }
}
