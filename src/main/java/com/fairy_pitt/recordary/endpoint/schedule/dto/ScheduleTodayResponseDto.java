package com.fairy_pitt.recordary.endpoint.schedule.dto;

import com.fairy_pitt.recordary.common.domain.ScheduleEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class ScheduleTodayResponseDto {
    private Long scheduleCd;
    private String scheduleNm;
    private String scheduleCol;
    private Date scheduleStr;
    private Date scheduleEnd;
    private int scheduleInWhere;

    public ScheduleTodayResponseDto(ScheduleEntity scheduleEntity, int scheduleInWhere){
        this.scheduleCd = scheduleEntity.getScheduleCd();
        this.scheduleNm = scheduleEntity.getScheduleNm();
        this.scheduleCol = scheduleEntity.getScheduleCol();
        this.scheduleStr = scheduleEntity.getScheduleStr();
        this.scheduleEnd = scheduleEntity.getScheduleEnd();
        this.scheduleInWhere = scheduleInWhere;
    }
}
