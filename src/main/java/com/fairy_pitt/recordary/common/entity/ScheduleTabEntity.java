package com.fairy_pitt.recordary.common.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "SCHEDULE_GB_TB")
public class ScheduleTabEntity {

    @Id
    private long TabCd;

    @ManyToOne
    private UserEntity tabUserFk;

    private String tabNm;

    private String tabCol;
}
