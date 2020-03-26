package com.fairy_pitt.recordary.common.entity;

import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import com.fairy_pitt.recordary.common.pk.ScheduleMemberEntityPK;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Table(name="SCHEDULE_MEMBER_TB")
@NoArgsConstructor
@IdClass(ScheduleMemberEntityPK.class)
@Entity
public class ScheduleMemberEntity implements Serializable {

    @Id
    @ManyToOne
    private ScheduleEntity scheduleCodeFK;

    @Id
    @ManyToOne
    private UserEntity userCodeFK;

    @Column(name="SCHEDULE_ACCEPT_ST")
    private Boolean scheduleState;

    @Builder
    public ScheduleMemberEntity(ScheduleEntity scheduleCodeFK,
                                UserEntity userCodeFK,
                                Boolean scheduleState){

      this.scheduleCodeFK = scheduleCodeFK;
      this.userCodeFK = userCodeFK;
      this.scheduleState = scheduleState;
    }

    public void scheduleMemberUpdate(Boolean scheduleState)
    {
        this.scheduleState = scheduleState;
    }


    /*SCHEDULE_FK (일정 코드) [PK] [FK] NN
SCHEDULE_MBR_FK (일정 멤버 코드) [PK] [FK] NN
SCHEDULE_ACCEPT_ST (일정 수락 상태) NN : BOOLEAN (0. 미수락 1. 수락) DEFAULT:0*/
}
