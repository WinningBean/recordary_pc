package com.fairy_pitt.recordary.endpoint.user.dto;

import com.fairy_pitt.recordary.endpoint.user.service.UserPasswordHashService;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@NoArgsConstructor
public class UserUpdateRequestDto {
    @Autowired private UserPasswordHashService userPasswordHashService;

    private String userPw;
    private String userNm;
    private String userPic;
    private String userEx;

    @Builder
    public UserUpdateRequestDto(String userPw, String userNm, String userPic, String userEx){
        this.userPw = userPw;
        this.userNm = userNm;
        this.userPic = userPic;
        this.userEx = userEx;
    }
}
