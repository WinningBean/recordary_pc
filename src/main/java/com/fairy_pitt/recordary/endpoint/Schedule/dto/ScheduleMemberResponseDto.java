package com.fairy_pitt.recordary.endpoint.Schedule.dto;

import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleMemberEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@Getter
public class ScheduleMemberResponseDto {

    private Long scheduleCd;
    private Long userId;
    private Boolean scheduleState;

    public ScheduleMemberResponseDto(ScheduleMemberEntity entity)
    {
        this.scheduleCd = entity.getScheduleFK().getScheduleCd();
        this.userId = entity.getUserFK().getUserCd();
        this.scheduleState = entity.getScheduleState();
    }
}
