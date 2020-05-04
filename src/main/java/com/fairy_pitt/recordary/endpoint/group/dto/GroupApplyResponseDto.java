package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Getter;

@Getter
public class GroupApplyResponseDto {

    private Long groupCd;
    private Long userCd;
    private int applyState;

    public GroupApplyResponseDto(GroupApplyEntity entity)
    {
        this.groupCd = entity.getGroupFK().getGroupCd();
        this.userCd = entity.getUserFK().getUserCd();
        this.applyState = entity.getApplyState();
    }
}
