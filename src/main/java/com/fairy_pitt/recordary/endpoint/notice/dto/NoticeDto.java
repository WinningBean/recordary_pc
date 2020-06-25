package com.fairy_pitt.recordary.endpoint.notice.dto;

import com.fairy_pitt.recordary.common.domain.NoticeType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NoticeDto {
    private NoticeType noticeType;
    private Long activeCd;
    private Long targetCd;

    @Builder
    public NoticeDto(NoticeType noticeType, Long activeCd, Long targetCd){
        this.noticeType = noticeType;
        this.activeCd = activeCd;
        this.targetCd = targetCd;
    }
}
