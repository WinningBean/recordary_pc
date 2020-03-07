package com.fairy_pitt.recordary.common.pk;

import lombok.Data;

import java.io.Serializable;

@Data
public class ScheduleMemberEntityPK implements Serializable {

    private Long scheduleCodeFK;
    private Long userCodeFK;

}
