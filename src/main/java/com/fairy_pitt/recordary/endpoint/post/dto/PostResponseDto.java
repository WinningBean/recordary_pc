package com.fairy_pitt.recordary.endpoint.post.dto;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import lombok.Getter;

@Getter
public class PostResponseDto {
    private String postEx;
    private int postPublicState;
    private String postStrYMD;
    private String postEndYMD;

    public PostResponseDto(PostEntity postEntity) {
        this.postEx = postEntity.getPostEx();
        this.postPublicState = postEntity.getPostPublicState();
        this.postStrYMD = postEntity.getPostStrYMD();
        this.postEndYMD = postEntity.getPostEndYMD();
    }
}