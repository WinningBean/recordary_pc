package com.fairy_pitt.recordary.common.pk;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class PostLikePK implements Serializable {
    private Long postFK;
    private Long userFK;
}
