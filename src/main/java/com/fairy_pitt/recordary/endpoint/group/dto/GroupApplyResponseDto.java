package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Getter;

@Getter
public class GroupApplyResponseDto {

    private Long groupCodeFK;
    private Long userCodeFK;
    private int applyState;

    public GroupApplyResponseDto(GroupApplyEntity entity)
    {
        this.groupCodeFK = entity.getGroupCodeFK().getGroupCd();
        this.userCodeFK = entity.getUserCodeFK().getUserCd();
        this.applyState = entity.getApplyState();
    }
}
