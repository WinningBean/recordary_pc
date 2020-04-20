package com.fairy_pitt.recordary.endpoint.post.dto;

import com.fairy_pitt.recordary.common.entity.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostListResponseDto {
    private Long postCd;
    private UserEntity userFK;
    private GroupEntity groupFK;
    private ScheduleEntity scheduleFK;
    private MediaEntity mediaFK;
    private String postEx;
    private int postPublicState;
    private String postStrYMD;
    private String postEndYMD;
    private LocalDateTime createdDate;

    public PostListResponseDto(PostEntity postEntity) {
        this.postCd = postEntity.getPostCd();
        this.userFK = postEntity.getUserFK();
        this.groupFK = postEntity.getGroupFK();
        this.scheduleFK = postEntity.getScheduleFK();
        this.postEx = postEntity.getPostEx();
        this.postPublicState = postEntity.getPostPublicState();
        this.postStrYMD = postEntity.getPostStrYMD();
        this.postEndYMD = postEntity.getPostEndYMD();
        this.createdDate = postEntity.getCreatedDate();
    }
}