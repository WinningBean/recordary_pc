package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class GroupPageResponseDto {

    private Long groupCd;
    private UserResponseDto admin;
    private List<UserResponseDto> memberList;
    private String groupEx;
    private String groupNm;
    private String groupPic;
    private Boolean groupState;

    public GroupPageResponseDto(GroupEntity entity)
    {
        this.groupCd = entity.getGroupCd();
        if (entity.getGMstUserFK() != null) this.admin = new UserResponseDto(entity.getGMstUserFK());
        this.memberList = entity.getMembers().stream()
                .map(gm -> gm.getUserFK())
                .map(UserResponseDto :: new)
                .collect(Collectors.toList());
        this.groupNm = entity.getGroupNm();
        this.groupState = entity.getGroupState();
        this.groupEx = entity.getGroupEx();
        this.groupPic = entity.getProfilePath();
    }


}
