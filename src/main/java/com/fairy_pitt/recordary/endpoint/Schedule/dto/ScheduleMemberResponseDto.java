package com.fairy_pitt.recordary.endpoint.Schedule.dto;

import com.fairy_pitt.recordary.common.entity.ScheduleMemberEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ScheduleMemberResponseDto {

    private Long scheduleCd;
    private Long userCd;
    private String userPic;
    private String userId;
    private String userNm;
    private Boolean scheduleState;

    public ScheduleMemberResponseDto(ScheduleMemberEntity entity)
    {
        this.scheduleCd = entity.getScheduleFK().getScheduleCd();
        this.userCd = entity.getUserFK().getUserCd();
        this.scheduleState = entity.getScheduleState();
        this.userCd = entity.getUserFK().getUserCd();
        this.userPic = entity.getUserFK().getUserPic();
        this.userId = entity.getUserFK().getUserId();
        this.userNm = entity.getUserFK().getUserNm();

    }
}
