package com.fairy_pitt.recordary.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Table(name = "SCHEDULE_GB_TB")
@NoArgsConstructor
@Entity
public class ScheduleTabEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SCHEDULE_GB_CD")
    private Long tabCd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SCHEDULE_GB_USER_FK", nullable = false)
    private UserEntity userFk;

    @Column(name = "SCHEDULE_GB_NM", nullable = false)
    private String tabNm;

    @Column(name = "SCHEDULE_GB_COLOR")
    private String tabCol;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tabFK")
    private List<ScheduleEntity> tabSchedules = new ArrayList<>();

    @Builder
    public ScheduleTabEntity(UserEntity userFk,
                             String tabNm,
                             String tabCol){
        this.userFk = userFk;
        this.tabCol = tabCol;
        this.tabNm = tabNm;
    }
}
