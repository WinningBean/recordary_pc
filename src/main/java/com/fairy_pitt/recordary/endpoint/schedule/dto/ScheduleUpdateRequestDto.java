package com.fairy_pitt.recordary.endpoint.schedule.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;


@NoArgsConstructor
@Getter
public class ScheduleUpdateRequestDto {

    private Long TabCodeFK;
    private String scheduleNm;
    private String scheduleEx;
    private Date scheduleStr;
    private Date scheduleEnd;
    private String scheduleCol;
    private int schedulePublicState;
    private List<Long> createMember;
    private List<Long> deleteMember;

    @Builder(builderClassName = "updateScheduleBuilder", builderMethodName = "updateScheduleBuilder")
    public ScheduleUpdateRequestDto(Long TabCodeFK,
                                  String scheduleNm,
                                  String scheduleEx,
                                  Date scheduleStr,
                                  Date scheduleEnd,
                                  String scheduleCol,
                                  int schedulePublicState,
                                    List<Long> createMember,
                                    List<Long> deleteMember)
    {
        this.TabCodeFK = TabCodeFK;
        this.scheduleNm = scheduleNm;
        this.scheduleEx = scheduleEx;
        this.scheduleStr = scheduleStr;
        this.scheduleEnd = scheduleEnd;
        this.scheduleCol = scheduleCol;
        this.schedulePublicState = schedulePublicState;
        this.createMember = createMember;
        this.deleteMember = deleteMember;
    }
}
