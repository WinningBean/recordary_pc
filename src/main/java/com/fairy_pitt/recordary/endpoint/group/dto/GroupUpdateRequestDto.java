package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.UserEntity;
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
    private String groupPic;

    @Builder(builderClassName = "updateGroupBuilder", builderMethodName = "updateGroupBuilder")
    public GroupUpdateRequestDto(String groupNm, Boolean groupState, String groupPic, String  groupEx)
    {
        this.groupNm = groupNm;
        this.groupState = groupState;
        this.groupPic = groupPic;
        this.groupEx = groupEx;
    }

    @Builder(builderClassName = "updateGroupMasterBuilder", builderMethodName = "updateGroupMasterBuilder")
    public GroupUpdateRequestDto(Long gMstUserFK)
    {
        this.userCd = gMstUserFK;
    }
}
