package com.fairy_pitt.recordary.endpoint.post.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostUpdateRequestDto {
    private String postEx;
    private int postPublicState;

    @Builder
    public PostUpdateRequestDto(String postEx, int postPublicState) {
        this.postEx = postEx;
        this.postPublicState = postPublicState;
    }
}