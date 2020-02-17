package com.fairy_pitt.recordary.common.pk;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class FollowerPK implements Serializable {
    @Column(name = "FOLLOWER_USER_FK")
    private Long userFK;

    @Column(name = "FOLLOWER_TARGET_FK")
    private Long targetFK;
}
