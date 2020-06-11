package com.fairy_pitt.recordary.common.entity;

import com.fairy_pitt.recordary.common.pk.PostLikePK;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "POST_LIKE_TB")
@IdClass(PostLikePK.class)
public class PostLikeEntity extends BaseTimeEntity{
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_FK", nullable = false)
    private PostEntity postFK;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_LIKE_USER_FK", nullable = false)
    private UserEntity userFK;

    @Builder
    public PostLikeEntity(PostEntity postFK, UserEntity userFK){
        this.postFK = postFK;
        this.userFK = userFK;
    }
}
