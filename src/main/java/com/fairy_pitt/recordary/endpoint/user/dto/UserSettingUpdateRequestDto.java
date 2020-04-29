package com.fairy_pitt.recordary.endpoint.user.dto;

import com.fairy_pitt.recordary.endpoint.user.service.UserPasswordHashService;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@NoArgsConstructor
public class UserSettingUpdateRequestDto {
    @Autowired private UserPasswordHashService userPasswordHashService;

    private String userPw;
    private String userNm;

    @Builder
    public UserSettingUpdateRequestDto(String userPw, String userNm){
        this.userPw = userPw;
        this.userNm = userNm;
    }
}
