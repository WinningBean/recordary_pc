package com.fairy_pitt.recordary.endpoint.follower.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FollowerRequestDto {
    private Long userCd;
    private Long targetCd;

    @Builder
    public FollowerRequestDto(Long userCd, Long targetCd){
        this.userCd = userCd;
        this.targetCd = targetCd;
    }
}
