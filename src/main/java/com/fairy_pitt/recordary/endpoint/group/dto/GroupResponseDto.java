package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Getter;

@Getter
public class GroupResponseDto { // 응답(요청에대한 답)

    private  Long groupCd;
    private Long userCd;
    private String groupNm;
    private Boolean groupState;
    private String groupEx;
    private String groupPic;
    private String userPic;
    private String userId;
    private String userNm;

    public GroupResponseDto(GroupEntity entity)
    {
        this.groupCd = entity.getGroupCd();
        this.userCd = entity.getGMstUserFK().getUserCd();
        this.groupNm = entity.getGroupName();
        this.groupState = entity.getGroupState();
        this.groupEx = entity.getGroupEx();
        this.groupPic = entity.getGroupPic();
    }


    public GroupResponseDto(GroupEntity entity, UserEntity user)
    {
        this.groupCd = entity.getGroupCd();
        this.userCd = entity.getGMstUserFK().getUserCd();
        this.groupNm = entity.getGroupName();
        this.groupState = entity.getGroupState();
        this.groupEx = entity.getGroupEx();
        this.groupPic = entity.getGroupPic();
        this.userPic = user.getUserPic();
        this.userNm = user.getUserNm();
        this.userId = user.getUserId();
    }
}
