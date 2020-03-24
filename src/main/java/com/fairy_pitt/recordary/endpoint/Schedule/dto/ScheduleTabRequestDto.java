package com.fairy_pitt.recordary.endpoint.Schedule.dto;

import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
public class ScheduleTabRequestDto {

    private UserEntity userFk;
    private String tabNm;
    private String tabCol;

    @Builder(builderClassName = "createScheduleBuilder", builderMethodName = "createScheduleBuilder")
    public ScheduleTabRequestDto(UserEntity userFk,
                                 String tabNm,
                                 String tabCol) {
        this.userFk = userFk;
        this.tabCol = tabCol;
        this.tabNm = tabNm;
    }

    public ScheduleTabEntity toEntity(){
        return ScheduleTabEntity.builder()
                .userFk(userFk)
                .tabNm(tabNm)
                .tabCol(tabCol)
                .build();
    }
}
