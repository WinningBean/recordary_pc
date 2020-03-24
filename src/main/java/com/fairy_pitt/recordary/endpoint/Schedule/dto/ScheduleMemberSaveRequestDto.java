package com.fairy_pitt.recordary.endpoint.Schedule.dto;

import com.fairy_pitt.recordary.common.entity.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@NoArgsConstructor
public class ScheduleMemberSaveRequestDto {

    private Long scheduleCodeFK;
    private Long userCodeFK;
    private Boolean scheduleState;

    @Builder(builderClassName = "createScheduleMemberBuilder", builderMethodName = "createScheduleMemberBuilder")
    public ScheduleMemberSaveRequestDto(Long scheduleCodeFK,
                                        Long userCodeFK,
                                        Boolean scheduleState) {
        this.scheduleCodeFK = scheduleCodeFK;
        this.userCodeFK = userCodeFK;
        this.scheduleState = scheduleState;
    }

    public ScheduleMemberEntity toEntity(ScheduleEntity schedule, UserEntity user){
        return ScheduleMemberEntity.builder()
                .scheduleCodeFK(schedule)
                .userCodeFK(user)
                .scheduleState(scheduleState)
                .build();
    }
}

