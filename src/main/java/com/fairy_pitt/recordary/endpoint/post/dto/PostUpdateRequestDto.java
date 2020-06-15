package com.fairy_pitt.recordary.endpoint.post.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostUpdateRequestDto {
    private Long groupCd;
    private Long scheduleCd;
    private Long mediaCd;
    private String postEx;
    private int postPublicState;

    @Builder
    public PostUpdateRequestDto(Long groupCd, Long scheduleCd, Long mediaCd, String postEx, int postPublicState) {
        this.groupCd = groupCd;
        this.scheduleCd = scheduleCd;
        this.mediaCd = mediaCd;
        this.postEx = postEx;
        this.postPublicState = postPublicState;
    }
}