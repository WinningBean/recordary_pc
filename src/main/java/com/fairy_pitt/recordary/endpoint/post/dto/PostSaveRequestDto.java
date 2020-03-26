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
    private String userFK_id;
    private Long groupFK_cd;
    private Long postOriginFK_cd;
    private Long scheduleFK_cd;
    private Long mediaFK_cd;
    private String postEx;
    private int postPublicState;
    private String postStrYMD;
    private String postEndYMD;

    @Builder
    public PostSaveRequestDto(String userFK_id,
                              Long groupFK_cd,
                              Long postOriginFK_cd,
                              Long scheduleFK_cd,
                              Long mediaFK_cd,
                              String postEx,
                              int postPublicState,
                              String postStrYMD,
                              String postEndYMD) {
        this.userFK_id = userFK_id;
        this.groupFK_cd = groupFK_cd;
        this.postOriginFK_cd = postOriginFK_cd;
        this.scheduleFK_cd = scheduleFK_cd;
        this.mediaFK_cd = mediaFK_cd;
        this.postEx = postEx;
        this.postPublicState = postPublicState;
        this.postStrYMD = postStrYMD;
        this.postEndYMD = postEndYMD;
    }
}