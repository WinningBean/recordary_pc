package com.fairy_pitt.recordary.endpoint.user.dto;

import com.fairy_pitt.recordary.common.domain.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSaveRequestDto {
    private String userId;
    private String userPw;
    private String userNm;

    @Builder
    public UserSaveRequestDto(String userId, String userPw, String userNm){
        this.userId = userId;
        this.userPw = userPw;
        this.userNm = userNm;
    }

    public UserEntity toEntity(){
        return UserEntity.builder()
                .userId(userId)
                .userPw(userPw)
                .userNm(userNm)
                .userPic("https://recordary-springboot-upload.s3.ap-northeast-2.amazonaws.com/user/basic.png")
                .build();
    }
}
