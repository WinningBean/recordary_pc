package com.fairy_pitt.recordary.common.domain;

import com.fairy_pitt.recordary.common.pk.FollowerPK;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name="FOLLOWER_TB")
@IdClass(FollowerPK.class)
public class FollowerEntity extends BaseTime {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FOLLOWER_USER_FK", nullable = false)
    private UserEntity userFK;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FOLLOWER_TARGET_FK", nullable = false)
    private UserEntity targetFK;

    @Builder
    public FollowerEntity(UserEntity userFK, UserEntity targetFK){
        this.userFK = userFK;
        this.targetFK = targetFK;
    }
}
