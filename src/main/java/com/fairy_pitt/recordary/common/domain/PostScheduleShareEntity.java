package com.fairy_pitt.recordary.common.domain;

import com.fairy_pitt.recordary.common.pk.PostScheduleSharePK;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "POST_SCHEDULE_SHARE_TB")
@IdClass(PostScheduleSharePK.class)
public class PostScheduleShareEntity extends BaseTime {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_FK", nullable = false)
    private PostEntity postFK;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SCHEDULE_FK", nullable = false)
    private ScheduleEntity scheduleFK;

    @Builder
    public PostScheduleShareEntity(PostEntity postFK, ScheduleEntity scheduleFK){
        this.postFK = postFK;
        this.scheduleFK = scheduleFK;
    }
}
