package com.fairy_pitt.recordary.endpoint.post.dto;

import com.fairy_pitt.recordary.common.entity.*;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
import com.fairy_pitt.recordary.endpoint.media.dto.MediaResponseDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostListResponseDto {
    private Long postCd;
    private UserResponseDto userFK;
    private GroupResponseDto groupFK;
    private Long postOriginFK;
    private ScheduleResponseDto scheduleFK;
    private MediaResponseDto mediaFK;
    private String postEx;
    private int postPublicState;
    private String postStrYMD;
    private String postEndYMD;
    private LocalDateTime createdDate;

    public PostListResponseDto(PostEntity postEntity) {
        this.postCd = postEntity.getPostCd();
        this.userFK = new UserResponseDto(postEntity.getUserFK());
        if (postEntity.getGroupFK() != null) this.groupFK = new GroupResponseDto(postEntity.getGroupFK());
        if (postEntity.getPostOriginFK() != null) this.postOriginFK = postEntity.getPostOriginFK().getPostCd();
        if (postEntity.getScheduleFK() != null) this.scheduleFK = new ScheduleResponseDto(postEntity.getScheduleFK());
        if (postEntity.getMediaFK() != null) this.mediaFK = new MediaResponseDto(postEntity.getMediaFK());
        this.postEx = postEntity.getPostEx();
        this.postPublicState = postEntity.getPostPublicState();
        this.postStrYMD = postEntity.getPostStrYMD();
        this.postEndYMD = postEntity.getPostEndYMD();
        this.createdDate = postEntity.getCreatedDate();
    }
}