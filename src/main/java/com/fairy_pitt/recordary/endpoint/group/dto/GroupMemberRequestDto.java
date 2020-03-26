package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class GroupMemberRequestDto {

    private Long groupCodeFK;
    private String userCodeFK;

    public GroupMemberRequestDto(Long groupCodeFK, String userCodeFK){

        this.groupCodeFK = groupCodeFK;
        this.userCodeFK = userCodeFK;
    }

    public GroupMemberEntity toEntity(GroupEntity groupCodeFK, UserEntity userCodeFK){
        return GroupMemberEntity.builder()
                .groupCodeFK(groupCodeFK)
                .userCodeFK(userCodeFK)
                .build();
    }
}
