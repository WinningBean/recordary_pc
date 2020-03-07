package com.fairy_pitt.recordary.common.entity;

import com.fairy_pitt.recordary.common.pk.PostLikePK;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "POST_LIKE_TB")
@IdClass(PostLikePK.class)
public class PostLikeEntity {
    @Id
    @ManyToOne
    @JoinColumn(name = "POST_FK")
    private PostEntity postFK;

    @Id
    @ManyToOne
    @JoinColumn(name = "USER_FK")
    private UserEntity userFK;
}
