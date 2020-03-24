package com.fairy_pitt.recordary.endpoint.Schedule.dto;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@Setter
public class ScheduleSaveRequestDto {

    private ScheduleTabEntity TabCodeFK;
    private PostEntity PostFK;
    private String scheduleNm;
    private String scheduleEx;
    private Date scheduleStr;
    private Date scheduleEnd;
    private String scheduleCol;

    @Builder(builderClassName = "createScheduleBuilder", builderMethodName = "createScheduleBuilder")
    public ScheduleSaveRequestDto(ScheduleTabEntity TabCodeFK,
                                  PostEntity PostFK,
                                  String scheduleNm,
                                  String scheduleEx,
                                  Date scheduleStr,
                                  Date scheduleEnd,
                                  String scheduleCol) {
        this.TabCodeFK = TabCodeFK;
        this.PostFK = PostFK;
        this.scheduleNm = scheduleNm;
        this.scheduleEx = scheduleEx;
        this.scheduleStr = scheduleStr;
        this.scheduleEnd = scheduleEnd;
        this.scheduleCol = scheduleCol;
    }

    public ScheduleEntity toEntity(){
        return ScheduleEntity.builder()
                .TabCodeFK(TabCodeFK)
                .PostFK(PostFK)
                .scheduleNm(scheduleNm)
                .scheduleEx(scheduleEx)
                .scheduleStr(scheduleStr)
                .scheduleEnd(scheduleEnd)
                .scheduleCol(scheduleCol)
                .build();
    }
}
