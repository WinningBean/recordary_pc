package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
public class GroupMemberRequestDto {

    private GroupEntity groupCodeFK;
    private UserEntity userCodeFK;

    public GroupMemberRequestDto(GroupEntity groupCodeFK, UserEntity userCodeFK){

        this.groupCodeFK = groupCodeFK;
        this.userCodeFK = userCodeFK;
    }

    public GroupMemberEntity toEntity(){
        return GroupMemberEntity.builder()
                .groupCodeFK(groupCodeFK)
                .userCodeFK(userCodeFK)
                .build();
    }
}
