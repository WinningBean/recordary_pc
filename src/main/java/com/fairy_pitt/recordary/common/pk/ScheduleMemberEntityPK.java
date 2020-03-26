package com.fairy_pitt.recordary.common.pk;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class ScheduleMemberEntityPK implements Serializable {

    private Long scheduleFK;
    private Long userFK;

}
