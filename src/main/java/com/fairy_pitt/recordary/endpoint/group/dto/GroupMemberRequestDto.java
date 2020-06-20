package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.common.domain.GroupMemberEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GroupMemberRequestDto {

    private Long groupCd;
    private Long userCd;

    @Builder
    public GroupMemberRequestDto(Long groupCd, Long userCd){

        this.groupCd = groupCd;
        this.userCd = userCd;
    }

    public GroupMemberEntity toEntity(GroupEntity groupCodeFK, UserEntity userCodeFK){
        return GroupMemberEntity.builder()
                .groupFK(groupCodeFK)
                .userFK(userCodeFK)
                .build();
    }
}
