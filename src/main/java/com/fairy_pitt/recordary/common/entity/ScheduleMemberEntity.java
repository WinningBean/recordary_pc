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
    private ScheduleEntity scheduleFK;

    @Id
    @ManyToOne
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
