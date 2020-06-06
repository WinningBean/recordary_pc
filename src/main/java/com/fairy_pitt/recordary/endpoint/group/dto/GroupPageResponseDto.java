package com.fairy_pitt.recordary.endpoint.group.dto;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.endpoint.post.dto.GroupPostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class GroupPageResponseDto {

    private UserResponseDto admin;
    private List<GroupPostResponseDto> postList;
    private List<GroupMemberResponseDto> memberList;
    private String groupEx;
    private String groupNm;
    private String groupPic;
    private Boolean groupState;

    public GroupPageResponseDto(GroupEntity entity)
    {
        if (entity.getGMstUserFK() != null) this.admin = new UserResponseDto(entity.getGMstUserFK());
        this.postList = entity.getPostEntityList().stream().map(GroupPostResponseDto::new).collect(Collectors.toList());
        this.memberList = entity.getMembers().stream()
                .map(GroupMemberResponseDto :: new)
                .collect(Collectors.toList());
        this.groupNm = entity.getGroupNm();
        this.groupState = entity.getGroupState();
        this.groupEx = entity.getGroupEx();
        this.groupPic = entity.getGroupPic();
    }


}
