package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.domain.GroupApplyEntity;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class GroupApplyResponseDto {

    private Long userCd;
    private String userId;
    private String userPic;
    private String userNm;
    private Long groupCd;
    private String groupNm;
    private LocalDateTime date;


    public GroupApplyResponseDto(GroupApplyEntity entity)
    {
        this.groupCd = entity.getGroupFK().getGroupCd();
        this.userCd = entity.getUserFK().getUserCd();
        this.date = entity.getCreatedDate();
        this.userNm = entity.getUserFK().getUserNm();
        this.userId = entity.getUserFK().getUserId();
        this.userPic= entity.getUserFK().getUserPic();
        this.groupNm = entity.getGroupFK().getGroupNm();
    }
}
