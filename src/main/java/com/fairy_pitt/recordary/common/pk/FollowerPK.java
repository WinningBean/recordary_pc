package com.fairy_pitt.recordary.common.pk;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class FollowerPK implements Serializable {
//    @Column(name = "FOLLOWER_USER_FK")
    private Long userFK;

//    @Column(name = "FOLLOWER_TARGET_FK")
    private Long targetFK;
}
