package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Getter;

@Getter
public class GroupResponseDto { // 응답(요청에대한 답)

    private  Long groupCd;
    private UserEntity gMstUserFK;
    private String groupName;
    private Boolean groupState;
    private String groupEx;
    private String groupPic;

    public GroupResponseDto(GroupEntity entity)
    {
        this.groupCd = entity.getGroupCd();
        this.gMstUserFK = entity.getGMstUserFK();
        this.groupName = entity.getGroupName();
        this.groupState = entity.getGroupState();
        this.groupEx = entity.getGroupEx();
        this.groupPic = entity.getGroupPic();
    }
}
