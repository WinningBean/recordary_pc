package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Getter;

@Getter
public class GroupApplyResponseDto {

    private GroupEntity groupCodeFK;
    private UserEntity userCodeFK;
    private int applyState;

    public GroupApplyResponseDto(GroupApplyEntity entity)
    {
        this.groupCodeFK = entity.getGroupCodeFK();
        this.userCodeFK = entity.getUserCodeFK();
        this.applyState = entity.getApplyState();
    }
}
