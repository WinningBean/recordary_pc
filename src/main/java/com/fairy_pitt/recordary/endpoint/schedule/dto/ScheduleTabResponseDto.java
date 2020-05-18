package com.fairy_pitt.recordary.endpoint.schedule.dto;

import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ScheduleTabResponseDto {

    private Long tabCd;
    private Long userCd;
    private String tabNm;
    private String tabCol;

    public ScheduleTabResponseDto(ScheduleTabEntity entity)
    {
        this.tabCd = entity.getTabCd();
        this.tabCol = entity.getTabCol();
        this.tabNm = entity.getTabNm();
        this.userCd = entity.getUserFk().getUserCd();
    }
}
