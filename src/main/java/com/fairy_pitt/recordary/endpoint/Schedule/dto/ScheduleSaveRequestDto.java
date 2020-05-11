package com.fairy_pitt.recordary.endpoint.Schedule.dto;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Getter
public class ScheduleSaveRequestDto {

    private Long tabCd;
    private Long userCd;
    private String scheduleNm;
    private String scheduleEx;
    private Date scheduleStr;
    private Date scheduleEnd;
    private String scheduleCol;
    private int schedulePublicState;

    @Builder(builderClassName = "createScheduleBuilder", builderMethodName = "createScheduleBuilder")
    public ScheduleSaveRequestDto(Long tabFK,
                                  Long userFk,
                                  String scheduleNm,
                                  String scheduleEx,
                                  Date scheduleStr,
                                  Date scheduleEnd,
                                  String scheduleCol,
                                  int schedulePublicState) {
        this.tabCd = tabFK;
        this.userCd = userFk;
        this.scheduleNm = scheduleNm;
        this.scheduleEx = scheduleEx;
        this.scheduleStr = scheduleStr;
        this.scheduleEnd = scheduleEnd;
        this.scheduleCol = scheduleCol;
        this.schedulePublicState = schedulePublicState;
    }

    public ScheduleEntity toEntity(ScheduleTabEntity Tab,
                                   UserEntity user){
        return ScheduleEntity.builder()
                .userFK(user)
                .tabFK(Tab)
                .scheduleNm(scheduleNm)
                .scheduleEx(scheduleEx)
                .scheduleStr(scheduleStr)
                .scheduleEnd(scheduleEnd)
                .scheduleCol(scheduleCol)
                .schedulePublicState(schedulePublicState)
                .build();
    }
}
