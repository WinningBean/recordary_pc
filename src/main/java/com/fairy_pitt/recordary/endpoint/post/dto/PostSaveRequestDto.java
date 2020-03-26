package com.fairy_pitt.recordary.endpoint.post.dto;

import com.fairy_pitt.recordary.common.entity.*;
import com.fairy_pitt.recordary.common.repository.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.Transient;

@Getter
@NoArgsConstructor
public class PostSaveRequestDto {
    private String userId;
    private Long groupCd;
    private Long postOriginCd;
    private Long scheduleCd;
    private Long mediaCd;
    private String postEx;
    private int postPublicState;
    private String postStrYMD;
    private String postEndYMD;

    @Builder
    public PostSaveRequestDto(String userId,
                              Long groupCd,
                              Long postOriginCd,
                              Long scheduleCd,
                              Long mediaCd,
                              String postEx,
                              int postPublicState,
                              String postStrYMD,
                              String postEndYMD) {
        this.userId = userId;
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