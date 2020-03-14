package com.fairy_pitt.recordary.endpoint.post.dto;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostSaveRequestDto {
    private String postEx;
    private int postPublicState;
    private String postStrYMD;
    private String postEndYMD;

    @Builder
    public PostSaveRequestDto(String postEx, int postPublicState, String postStrYMD, String postEndYMD) {
        this.postEx = postEx;
        this.postPublicState = postPublicState;
        this.postStrYMD = postStrYMD;
        this.postEndYMD = postEndYMD;
    }

    public PostEntity toEntity() {
        return PostEntity.builder()
                .postEx(postEx)
                .postPublicState(postPublicState)
                .postStrYMD(postStrYMD)
                .postEndYMD(postEndYMD)
                .build();
    }

}