package com.fairy_pitt.recordary.endpoint.post.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostSaveRequestDto {
    private Long userCd;
    private Long groupCd;
    private Long postOriginCd;
    private Long scheduleCd;
    private Long mediaCd;
    private String postEx;
    private int postPublicState;
    private String postStrYMD;
    private String postEndYMD;

    @Builder
    public PostSaveRequestDto(Long userCd,
                              Long groupCd,
                              Long postOriginCd,
                              Long scheduleCd,
                              Long mediaCd,
                              String postEx,
                              int postPublicState,
                              String postStrYMD,
                              String postEndYMD) {
        this.userCd = userCd;
        this.groupCd = groupCd;
        this.postOriginCd = postOriginCd;
        this.scheduleCd = scheduleCd;
        this.mediaCd = mediaCd;
        this.postEx = postEx;
        this.postPublicState = postPublicState;
        this.postStrYMD = postStrYMD;
        this.postEndYMD = postEndYMD;
    }
}