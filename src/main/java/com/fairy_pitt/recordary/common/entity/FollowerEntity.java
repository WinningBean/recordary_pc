package com.fairy_pitt.recordary.common.entity;

import com.fairy_pitt.recordary.common.pk.FollowerPK;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="FOLLOWER_TB")
//@NoArgsConstructor
//@AllArgsConstructor
@IdClass(FollowerPK.class)
public class FollowerEntity {
    @Id
    @ManyToOne
    @JoinColumn(name = "FOLLOWER_USER_FK")
    private UserEntity userFK;

    @Id
    @ManyToOne
    @JoinColumn(name = "FOLLOWER_TARGET_FK")
    private UserEntity targetFK;
}
