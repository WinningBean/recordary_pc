package com.fairy_pitt.recordary.common.entity;

import com.fairy_pitt.recordary.common.pk.PostTagPK;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "POST_TAG_TB")
@IdClass(PostTagPK.class)
public class PostTagEntity {
    @Id
    @ManyToOne
    @JoinColumn(name = "POST_FK")
    private PostEntity postFK;

    @Id
    @ManyToOne
    @JoinColumn(name = "POST_TAG_USER_FK")
    private UserEntity userFK;
}
