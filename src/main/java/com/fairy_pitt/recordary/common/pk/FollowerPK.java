package com.fairy_pitt.recordary.common.pk;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class FollowerPK implements Serializable {
    private Long userFK;
    private Long targetFK;
}
