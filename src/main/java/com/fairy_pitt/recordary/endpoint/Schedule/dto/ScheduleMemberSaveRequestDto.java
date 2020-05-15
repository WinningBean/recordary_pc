package com.fairy_pitt.recordary.endpoint.Schedule.dto;

import com.fairy_pitt.recordary.common.entity.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class ScheduleMemberSaveRequestDto {

    private Long scheduleCd;
    private Long userCd;
    private Boolean scheduleState;

    @Builder(builderClassName = "createScheduleMemberBuilder", builderMethodName = "createScheduleMemberBuilder")
    public ScheduleMemberSaveRequestDto(Long scheduleCd,
                                        Long userCd,
                                        Boolean scheduleState) {
        this.scheduleCd = scheduleCd;
        this.userCd = userCd;
        this.scheduleState = scheduleState;
    }

    public ScheduleMemberEntity toEntity(ScheduleEntity schedule, UserEntity user){
        return ScheduleMemberEntity.builder()
                .scheduleFK(schedule)
                .userFK(user)
                .scheduleState(scheduleState)
                .build();
    }
}

