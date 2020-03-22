package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
public class GroupApplyRequestDto {

    private GroupEntity groupCodeFK;
    private UserEntity userCodeFK;
    private int applyState;

    @Builder
    public GroupApplyRequestDto(UserEntity user, GroupEntity group, int applyState)
    {
        this.groupCodeFK = group;
        this.userCodeFK = user;
        this.applyState =  applyState;
    }

    public GroupApplyEntity toEntity(){
        return GroupApplyEntity.builder()
                .groupCodeFK(groupCodeFK)
                .userCodeFK(userCodeFK)
                .applyState(applyState)
                .build();
    }
}
