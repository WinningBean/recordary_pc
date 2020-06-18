package com.fairy_pitt.recordary.common.pk;

import lombok.Getter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Embeddable
public class PostScheduleSharePK implements Serializable {
    private Long postFK;
    private Long scheduleFK;
}
