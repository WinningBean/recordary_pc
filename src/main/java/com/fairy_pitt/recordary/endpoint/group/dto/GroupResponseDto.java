package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.domain.GroupEntity;
import lombok.Getter;

@Getter
public class GroupResponseDto { // 응답(요청에대한 답)

    private Long groupCd;
    private Long userCd;
    private String groupNm;
    private Boolean groupState;
    private String groupEx;
    private String groupPic;
    private Boolean isMaster = true;

    public GroupResponseDto(GroupEntity entity)
    {
        this.groupCd = entity.getGroupCd();
        this.userCd = entity.getGMstUserFK().getUserCd();
        this.groupNm = entity.getGroupNm();
        this.groupState = entity.getGroupState();
        this.groupEx = entity.getGroupEx();
        this.groupPic = entity.getProfilePath();
    }

    public GroupResponseDto(GroupEntity entity, Boolean isMaster)
    {
        this.groupCd = entity.getGroupCd();
        this.userCd = entity.getGMstUserFK().getUserCd();
        this.groupNm = entity.getGroupNm();
        this.groupState = entity.getGroupState();
        this.groupEx = entity.getGroupEx();
        this.groupPic = entity.getProfilePath();
        this.isMaster = isMaster;
    }

}
