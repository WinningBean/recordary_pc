package com.fairy_pitt.recordary.endpoint.schedule.dto;

import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.common.domain.ScheduleEntity;
import com.fairy_pitt.recordary.common.domain.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Getter
public class ScheduleSaveRequestDto {

    private Long tabCd;
    private Long userCd;
    private Long groupCd;
    private String scheduleNm;
    private String scheduleEx;
    private Date scheduleStr;
    private Date scheduleEnd;
    private String scheduleCol;
    private int schedulePublicState;
    private List<Long> scheduleMember;

    @Builder(builderClassName = "createScheduleBuilder", builderMethodName = "createScheduleBuilder")
    public ScheduleSaveRequestDto(Long tabCd,
                                  Long userCd,
                                  Long groupCd,
                                  String scheduleNm,
                                  String scheduleEx,
                                  Date scheduleStr,
                                  Date scheduleEnd,
                                  String scheduleCol,
                                  int schedulePublicState,
                                  List<Long> scheduleMember) {
        this.tabCd = tabCd;
        this.userCd = userCd;
        this.groupCd = groupCd;
        this.scheduleNm = scheduleNm;
        this.scheduleEx = scheduleEx;
        this.scheduleStr = scheduleStr;
        this.scheduleEnd = scheduleEnd;
        this.scheduleCol = scheduleCol;
        this.schedulePublicState = schedulePublicState;
        this.scheduleMember = scheduleMember;
    }

    public ScheduleEntity toEntity(ScheduleTabEntity Tab,
                                   UserEntity user,
                                   GroupEntity group){
        return ScheduleEntity.builder()
                .userFK(user)
                .tabFK(Tab)
                .groupFK(group)
                .scheduleNm(scheduleNm)
                .scheduleEx(scheduleEx)
                .scheduleStr(scheduleStr)
                .scheduleEnd(scheduleEnd)
                .scheduleCol(scheduleCol)
                .schedulePublicState(schedulePublicState)
                .build();
    }
}
