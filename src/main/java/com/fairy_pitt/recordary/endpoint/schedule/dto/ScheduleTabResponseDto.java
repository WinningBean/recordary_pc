package com.fairy_pitt.recordary.endpoint.schedule.dto;

import com.fairy_pitt.recordary.common.domain.ScheduleTabEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ScheduleTabResponseDto {
    private Long scheduleTabCd;
    private String scheduleTabNm;
    private String scheduleTabColor;

    public ScheduleTabResponseDto(ScheduleTabEntity scheduleTabEntity){
        this.scheduleTabCd = scheduleTabEntity.getTabCd();
        this.scheduleTabNm = scheduleTabEntity.getTabNm();
        this.scheduleTabColor = scheduleTabEntity.getTabCol();
    }
}
