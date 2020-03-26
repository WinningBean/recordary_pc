package com.fairy_pitt.recordary.common.entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@Getter
@Table(name = "SCHEDULE_GB_TB")
@Entity
public class ScheduleTabEntity {

    @Id
    private Long tabCd;

    @ManyToOne
    private UserEntity userFk;

    private String tabNm;

    private String tabCol;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "TabCodeFK")
    private List<ScheduleEntity> tabSchedules;

    @Builder
    public ScheduleTabEntity(UserEntity userFk,
                             String tabNm,
                             String tabCol){
        this.userFk = userFk;
        this.tabCol = tabCol;
        this.tabNm = tabNm;
    }
}
