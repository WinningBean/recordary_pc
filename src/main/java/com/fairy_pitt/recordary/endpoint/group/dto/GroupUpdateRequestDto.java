package com.fairy_pitt.recordary.endpoint.group.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class GroupUpdateRequestDto {

    private Long userCd;
    private String groupNm;
    private Boolean groupState;
    private String groupEx;

    @Builder(builderClassName = "updateGroupBuilder", builderMethodName = "updateGroupBuilder")
    public GroupUpdateRequestDto(String groupNm, Boolean groupState, String groupPic, String  groupEx)
    {
        this.groupNm = groupNm;
        this.groupState = groupState;
        this.groupEx = groupEx;
    }

    @Builder(builderClassName = "updateGroupMasterBuilder", builderMethodName = "updateGroupMasterBuilder")
    public GroupUpdateRequestDto(Long gMstUserFK)
    {
        this.userCd = gMstUserFK;
    }
}
