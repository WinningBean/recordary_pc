package com.fairy_pitt.recordary.endpoint.user.dto;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Getter;

@Getter
public class UserListResponseDto {
    private String userId;
    private String userNm;

    public UserListResponseDto(UserEntity userEntity){
        this.userId = userEntity.getUserId();
        this.userNm = userEntity.getUserNm();
    }
}
