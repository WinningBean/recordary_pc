package com.fairy_pitt.recordary.endpoint.Schedule.dto;

import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
public class ScheduleTabRequestDto {

    private String userFk;
    private String tabNm;
    private String tabCol;

    @Builder(builderClassName = "createScheduleTabBuilder", builderMethodName = "createScheduleTabBuilder")
    public ScheduleTabRequestDto(String userFk,
                                 String tabNm,
                                 String tabCol) {
        this.userFk = userFk;
        this.tabCol = tabCol;
        this.tabNm = tabNm;
    }

    public ScheduleTabEntity toEntity(UserEntity user){
        return ScheduleTabEntity.builder()
                .userFk(user)
                .tabNm(tabNm)
                .tabCol(tabCol)
                .build();
    }
}
