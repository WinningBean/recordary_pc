package com.fairy_pitt.recordary.dto.group;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
public class GroupMemberDto {

    private GroupEntity groupCodeFK;
    private UserEntity userCodeFK;


    @Builder(builderClassName = "addGroupMemberBuilder", builderMethodName = "addGroupMemberBuilder")
    public GroupMemberDto(GroupEntity groupCodeFK,UserEntity userCodeFK)
    {

    }


    public GroupMemberEntity toEntity(){
        return GroupMemberEntity.builder()

                .build();
    }

}
