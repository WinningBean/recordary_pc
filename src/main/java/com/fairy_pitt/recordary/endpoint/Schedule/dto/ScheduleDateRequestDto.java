package com.fairy_pitt.recordary.endpoint.schedule.dto;

import lombok.Getter;

import java.util.Date;

@Getter
public class ScheduleDateRequestDto {

    private Date fromDate;
    private Date toDate;

   public ScheduleDateRequestDto(Date frommDate,
                                 Date toDate)
   {
       this.fromDate = frommDate;
       this.toDate = toDate;
   }

}
