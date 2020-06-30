package com.fairy_pitt.recordary.endpoint.schedule.dto;

import com.fairy_pitt.recordary.common.domain.ScheduleEntity;
import com.fairy_pitt.recordary.common.domain.ScheduleMemberEntity;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@Getter
public class ScheduleResponseDto {

    private Long scheduleCd;
    private UserResponseDto user;
    private Long tabCd;
    private String scheduleNm;
    private String scheduleEx;
    private Date scheduleStr;
    private Date scheduleEnd;
    private String scheduleCol;
    private String tabCol;
    private String tabNM;
    private int schedulePublicState;
    private int scheduleInWhere;
    private List<ScheduleMemberResponseDto> scheduleMemberList;

    public ScheduleResponseDto(ScheduleEntity entity) {
        this.scheduleCd = entity.getScheduleCd();
        if (entity.getTabFK() != null) this.tabCd = entity.getTabFK().getTabCd();
        this.user = new UserResponseDto(entity.getUserFk());
        this.scheduleNm = entity.getScheduleNm();
        this.scheduleEx = entity.getScheduleEx();
        this.scheduleStr = entity.getScheduleStr();
        this.scheduleEnd = entity.getScheduleEnd();
        this.scheduleCol = entity.getScheduleCol();
        if (entity.getTabFK() != null) this.tabCol = entity.getTabFK().getTabCol();
        if (entity.getTabFK() != null) this.tabNM = entity.getTabFK().getTabNm();
        this.schedulePublicState = entity.getSchedulePublicState();
        this.scheduleMemberList = entity.getScheduleMembers().stream()
                .map(ScheduleMemberResponseDto :: new)
                .collect(Collectors.toList());
    }

    public ScheduleResponseDto(ScheduleMemberEntity entity)
    {
        //this.userCd = entity.getScheduleFK().getUserFk().getUserCd();
        this.scheduleNm = entity.getScheduleFK().getScheduleNm();
        this.scheduleEx = entity.getScheduleFK().getScheduleEx();
        this.scheduleStr = entity.getScheduleFK().getScheduleStr();
        this.scheduleEnd = entity.getScheduleFK().getScheduleEnd();
        this.scheduleCol = entity.getScheduleFK().getScheduleCol();
        this.schedulePublicState = entity.getScheduleFK().getSchedulePublicState();
    }

    public ScheduleResponseDto(ScheduleEntity scheduleEntity, int scheduleInWhere){
        this.scheduleCd = scheduleEntity.getScheduleCd();
        this.scheduleNm = scheduleEntity.getScheduleNm();
        this.scheduleEx = scheduleEntity.getScheduleEx();
        this.scheduleCol = scheduleEntity.getScheduleCol();
        this.scheduleStr = scheduleEntity.getScheduleStr();
        this.scheduleEnd = scheduleEntity.getScheduleEnd();
        this.scheduleInWhere = scheduleInWhere;
    }
}
