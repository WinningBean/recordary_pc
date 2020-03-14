package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
public class GroupApplyDto {

    private GroupEntity groupCodeFK;
    private UserEntity userCodeFK;
    private int applyState;


    @Builder(builderClassName = "createGroupMemberBuilder", builderMethodName = "createGroupMemberBuilder")
    public GroupApplyDto(GroupEntity groupCodeFK, UserEntity userCodeFK, int applyState)
    {
        this.groupCodeFK = groupCodeFK;
        this.userCodeFK = userCodeFK;
        this.applyState = applyState;
    }

    /*    @Id
    @ManyToOne
    private GroupEntity groupCodeFK;

    @Id
    @ManyToOne
    private UserEntity userCodeFK;

    private int applyState;*/
}
