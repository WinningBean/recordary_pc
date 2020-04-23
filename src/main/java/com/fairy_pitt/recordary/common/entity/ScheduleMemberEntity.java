package com.fairy_pitt.recordary.common.entity;

import com.fairy_pitt.recordary.common.pk.ScheduleMemberEntityPK;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Table(name="SCHEDULE_MEMBER_TB")
@NoArgsConstructor
@IdClass(ScheduleMemberEntityPK.class)
@Entity
public class ScheduleMemberEntity extends BaseTimeEntity implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SCHEDULE_FK")
    private ScheduleEntity scheduleFK;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SCHEDULE_MBR_FK")
    private UserEntity userFK;

    @Column(name="SCHEDULE_ACCEPT_ST")
    private Boolean scheduleState;

    @Builder
    public ScheduleMemberEntity(ScheduleEntity scheduleFK,
                                UserEntity userFK,
                                Boolean scheduleState){
      this.scheduleFK = scheduleFK;
      this.userFK = userFK;
      this.scheduleState = scheduleState;
    }

    public void scheduleMemberUpdate(Boolean scheduleState)
    {
        this.scheduleState = scheduleState;
    }

}
