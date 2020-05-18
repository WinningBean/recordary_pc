package com.fairy_pitt.recordary.endpoint.schedule.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ScheduleMemberUpdateRequestDto {
    private Boolean scheduleState;

    public ScheduleMemberUpdateRequestDto(Boolean scheduleState) {
        this.scheduleState = scheduleState;
    }
}
