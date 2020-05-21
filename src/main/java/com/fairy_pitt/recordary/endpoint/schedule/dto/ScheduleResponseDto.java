package com.fairy_pitt.recordary.endpoint.schedule.dto;

import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleMemberEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Getter
public class ScheduleResponseDto {

    private Long scheduleCd;
    private Long tabCd;
    private Long  userCd;
    private String scheduleNm;
    private String scheduleEx;
    private Date scheduleStr;
    private Date scheduleEnd;
    private String scheduleCol;
    private String tabCol;
    private int schedulePublicState;

    public ScheduleResponseDto(ScheduleEntity entity) {
        this.scheduleCd = entity.getScheduleCd();
        if (entity.getTabFK() != null) this.tabCd = entity.getTabFK().getTabCd();
        this.userCd = entity.getUserFk().getUserCd();
        this.scheduleNm = entity.getScheduleNm();
        this.scheduleEx = entity.getScheduleEx();
        this.scheduleStr = entity.getScheduleStr();
        this.scheduleEnd = entity.getScheduleEnd();
        this.scheduleCol = entity.getScheduleCol();
        if (entity.getTabFK() != null) this.tabCol = entity.getTabFK().getTabCol();
        this.schedulePublicState = entity.getSchedulePublicState();
    }

    public ScheduleResponseDto(ScheduleMemberEntity entity)
    {
        //this.userCd = entity.getScheduleFK().getUserFk().getUserCd();
        this.scheduleNm = entity.getScheduleFK().getScheduleNm();
        this.scheduleEx = entity.getScheduleFK().getScheduleEx();
        this.scheduleStr = entity.getScheduleFK().getScheduleStr();
        this.scheduleEnd = entity.getScheduleFK().getScheduleEnd();
        this.scheduleCol = entity.getScheduleFK().getScheduleCol();
        this.schedulePublicState = entity.getScheduleFK().getSchedulePublicState();
    }
}
