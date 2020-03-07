package com.fairy_pitt.recordary.common.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class CommentEntity {

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

    @Column(name = "COMMENT_CREATED_DT")
    @CreatedDate
    private LocalDateTime createdDate;

    @Column(name = "COMMENT_UPDATED_DT")
    @LastModifiedDate
    private LocalDateTime updatedDate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "commentOriginFK")
    private List<CommentEntity> applyGroups;
}
