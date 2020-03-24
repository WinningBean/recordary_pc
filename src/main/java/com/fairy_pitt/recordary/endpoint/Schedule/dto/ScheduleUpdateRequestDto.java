package com.fairy_pitt.recordary.endpoint.Schedule.dto;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@NoArgsConstructor
@Getter
public class ScheduleUpdateRequestDto {

    private ScheduleTabEntity TabCodeFK;
    private PostEntity PostFK;
    private String scheduleNm;
    private String scheduleEx;
    private Date scheduleStr;
    private Date scheduleEnd;
    private String scheduleCol;

    @Builder(builderClassName = "updateScheduleBuilder", builderMethodName = "updateScheduleBuilder")
    public ScheduleUpdateRequestDto(ScheduleTabEntity TabCodeFK,
                                  PostEntity PostFK,
                                  String scheduleNm,
                                  String scheduleEx,
                                  Date scheduleStr,
                                  Date scheduleEnd,
                                  String scheduleCol)
    {
        this.TabCodeFK = TabCodeFK;
        this.PostFK = PostFK;
        this.scheduleNm = scheduleNm;
        this.scheduleEx = scheduleEx;
        this.scheduleStr = scheduleStr;
        this.scheduleEnd = scheduleEnd;
        this.scheduleCol = scheduleCol;
    }
}
