package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class GroupApplyRequestDto {

    private Long groupCodeFK;
    private String userCodeFK;
    private int applyState;

    @Builder
    public GroupApplyRequestDto(String userId, Long groupCd, int applyState)
    {
        this.groupCodeFK = groupCd;
        this.userCodeFK = userId;
        this.applyState =  applyState;
    }

    public GroupApplyEntity toEntity(UserEntity user, GroupEntity group){
        return GroupApplyEntity.builder()
                .groupFK(group)
                .userFK(user)
                .applyState(applyState)
                .build();
    }
}
