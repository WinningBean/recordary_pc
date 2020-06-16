package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.domain.GroupMemberEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GroupMemberResponseDto {

    private Long userCd;
    private String userPic;
    private String userId;
    private String userNm;

    public GroupMemberResponseDto(GroupMemberEntity entity)
    {
        this.userCd = entity.getUserFK().getUserCd();
        this.userNm = entity.getUserFK().getUserNm();
        this.userId =  entity.getUserFK().getUserId();
        this.userPic = entity.getUserFK().getUserPic();
    }
}
