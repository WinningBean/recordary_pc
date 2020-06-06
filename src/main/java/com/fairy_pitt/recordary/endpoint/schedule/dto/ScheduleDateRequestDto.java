package com.fairy_pitt.recordary.endpoint.schedule.dto;

import lombok.Getter;

import java.util.Date;

@Getter
public class ScheduleDateRequestDto {

    private  Long tabCd;
    private Date fromDate;
    private Date toDate;

   public ScheduleDateRequestDto(Date frommDate,
                                 Date toDate,
                                 Long tabCd)
   {
       this.fromDate = frommDate;
       this.toDate = toDate;
       this.tabCd = tabCd;
   }

}
