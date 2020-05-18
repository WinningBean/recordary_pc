package com.fairy_pitt.recordary.endpoint.schedule.dto;

import lombok.Getter;

import java.util.Date;

@Getter
public class ScheduleRequestDto {

    private Long userCd;
    private int state;
    private Date frommDate;
    private Date toDate;

   public ScheduleRequestDto(Long userCd,
                             int state,
                             Date frommDate,
                             Date toDate)
   {
       this.userCd = userCd;
       this.state = state;
       this.frommDate = frommDate;
       this.toDate = toDate;
   }

}
