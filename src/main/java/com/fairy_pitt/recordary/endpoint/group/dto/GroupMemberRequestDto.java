package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class GroupMemberRequestDto {

    private Long groupCd;
    private String userId;

    @Builder
    public GroupMemberRequestDto(Long groupCd, String userId){

        this.groupCd = groupCd;
        this.userId = userId;
    }

    public GroupMemberEntity toEntity(GroupEntity groupCodeFK, UserEntity userCodeFK){
        return GroupMemberEntity.builder()
                .groupFK(groupCodeFK)
                .userFK(userCodeFK)
                .build();
    }
}
