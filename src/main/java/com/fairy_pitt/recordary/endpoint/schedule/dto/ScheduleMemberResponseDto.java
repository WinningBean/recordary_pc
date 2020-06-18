package com.fairy_pitt.recordary.endpoint.schedule.dto;

import com.fairy_pitt.recordary.common.domain.ScheduleMemberEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ScheduleMemberResponseDto {

    //private Long scheduleCd;
    private Long userCd;
    private String userPic;
    private String userId;
    private String userNm;
    private Boolean scheduleState;

    public ScheduleMemberResponseDto(ScheduleMemberEntity entity)
    {
       // this.scheduleCd = entity.getScheduleFK().getScheduleCd();
        this.userCd = entity.getUserFK().getUserCd();
        this.scheduleState = entity.getScheduleState();
        this.userCd = entity.getUserFK().getUserCd();
        this.userPic = entity.getUserFK().getUserPic();
        this.userId = entity.getUserFK().getUserId();
        this.userNm = entity.getUserFK().getUserNm();

    }
}
