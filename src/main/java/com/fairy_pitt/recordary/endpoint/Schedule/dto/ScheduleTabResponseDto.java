package com.fairy_pitt.recordary.endpoint.Schedule.dto;

import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ScheduleTabResponseDto {

    private Long tabCd;
    private UserEntity userFk;
    private String tabNm;
    private String tabCol;

    public ScheduleTabResponseDto(ScheduleTabEntity entity)
    {
        this.tabCd = entity.getTabCd();
        this.tabCol = entity.getTabCol();
        this.tabNm = entity.getTabNm();
        this.userFk = entity.getUserFk();
    }
}
