package com.fairy_pitt.recordary.common.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "COMMENT_TB")
public class CommentEntity extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "COMMENT_CD")
    private Long commentCd;

    @ManyToOne
    @JoinColumn(name = "COMMENT_USER_FK")
    private UserEntity commentUserFK;

    @ManyToOne
    @JoinColumn(name = "COMMENT_POST_FK")
    private PostEntity commentPostFK;

    @ManyToOne
    @JoinColumn(name = "COMMENT_ORIGIN_FK")
    private CommentEntity commentOriginFK;

    @Column(name = "COMMENT_EX")
    @Type(type = "text")
    private String commentEx;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "commentOriginFK")
    private List<CommentEntity> commentOriginList;

    @Builder
    public CommentEntity(String commentEx, UserEntity commentUserFK, PostEntity commentPostFK, CommentEntity commentOriginFK){
        this.commentEx = commentEx;
        this.commentUserFK = commentUserFK;
        this.commentPostFK = commentPostFK;
        this.commentOriginFK = commentOriginFK;
    }
}
