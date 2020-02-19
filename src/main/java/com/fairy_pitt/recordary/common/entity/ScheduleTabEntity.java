package com.fairy_pitt.recordary.common.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "SCHEDULE_GB_TB")
public class ScheduleTabEntity {

    @Id
    private Long tabCd;

    @ManyToOne
    private UserEntity tabUserFk;

    private String tabNm;

    private String tabCol;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "TabCodeFK")
    private List<ScheduleEntity> tabSchedules;
}
