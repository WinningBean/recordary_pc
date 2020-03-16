package com.fairy_pitt.recordary.endpoint.user.dto;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.endpoint.user.service.UserPasswordHashService;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@NoArgsConstructor
public class UserLoginRequestDto {
    private String userId;
    private String userPw;

    @Builder
    public UserLoginRequestDto(String userId, String userPw){
        this.userId = userId;
        this.userPw = userPw;
    }

    public UserEntity toEntity(){
        return UserEntity.builder()
                .userId(userId)
                .userPw(userPw)
                .build();
    }
}
