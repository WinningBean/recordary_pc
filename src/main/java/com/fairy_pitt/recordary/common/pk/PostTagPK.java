package com.fairy_pitt.recordary.common.pk;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class PostTagPK implements Serializable {
//    @Column(name = "POST_FK")
    private Long postFK;

//    @Column(name = "POST_TAG_USER_FK")
    private Long userFK;
}
