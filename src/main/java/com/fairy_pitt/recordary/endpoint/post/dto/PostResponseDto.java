package com.fairy_pitt.recordary.endpoint.post.dto;

import com.fairy_pitt.recordary.common.entity.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostResponseDto {
    private PostEntity postOriginFK;
    private ScheduleEntity scheduleFK;
    private MediaEntity mediaFK;
    private String postEx;
    private int postPublicState;
    private String postStrYMD;
    private String postEndYMD;
    private LocalDateTime modifiedDate;

    public PostResponseDto(PostEntity postEntity) {
        this.postOriginFK = postEntity.getPostOriginFK();
        this.scheduleFK = postEntity.getScheduleFK();
        this.postEx = postEntity.getPostEx();
        this.postPublicState = postEntity.getPostPublicState();
        this.postStrYMD = postEntity.getPostStrYMD();
        this.postEndYMD = postEntity.getPostEndYMD();
        this.modifiedDate = postEntity.getModifiedDate();
    }
}