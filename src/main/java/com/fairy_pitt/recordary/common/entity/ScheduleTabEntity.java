package com.fairy_pitt.recordary.common.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;


@Getter
@Table(name = "SCHEDULE_GB_TB")
@NoArgsConstructor
@Entity
public class ScheduleTabEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "SCHEDULE_GB_CD")
    private Long tabCd;

    @ManyToOne
    @JoinColumn(name = "SCHEDULE_GB_USER_FK")
    private UserEntity userFk;

    @Column(name = "SCHEDULE_GB_NM")
    private String tabNm;

    @Column(name = "SCHEDULE_GB_COLOR")
    private String tabCol;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tabFK")
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
