package com.fairy_pitt.recordary.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "COMMENT_TB")
public class CommentEntity extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_CD")
    private Long commentCd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMENT_USER_FK")
    private UserEntity commentUserFK;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMENT_POST_FK")
    private PostEntity commentPostFK;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMENT_ORIGIN_FK")
    private CommentEntity commentOriginFK;

    @Column(name = "COMMENT_EX")
    @Type(type = "text")
    private String commentEx;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "commentOriginFK")
    private List<CommentEntity> commentOriginList = new ArrayList<>();

    @Builder
    public CommentEntity(String commentEx, UserEntity commentUserFK, PostEntity commentPostFK, CommentEntity commentOriginFK){
        this.commentEx = commentEx;
        this.commentUserFK = commentUserFK;
        this.commentPostFK = commentPostFK;
        this.commentOriginFK = commentOriginFK;
    }
}
