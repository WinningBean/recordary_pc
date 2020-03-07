package com.fairy_pitt.recordary.common.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "POST_TB")
public class PostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "POST_CD")
    private Long postCd;

    @ManyToOne
    @JoinColumn(name = "POST_USER_FK")
    private UserEntity userFK;

    @ManyToOne
    @JoinColumn(name = "POST_GROUP_FK")
    private GroupEntity groupFK;

    @ManyToOne
    @JoinColumn(name = "POST_ORIGIN_FK")
    private PostEntity postOriginFK;

    @Column(name = "POST_EX")
    private String postEx;

    @Column(name = "POST_PB_ST")
    private int postPublicState;

    @Column(name = "POST_STR_YMD")
    private String postStrYMD;

    @Column(name = "POST_END_YMD")
    private String postEndYMD;

    @Column(name = "POST_CREATED_DT")
    @CreatedDate
    private LocalDateTime createdDate;

    @Column(name = "POST_UPDATED_DT")
    @LastModifiedDate
    private LocalDateTime updatedDate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postCodeFK")
    private List<ScheduleEntity> postSchedules;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postFK", cascade = {CascadeType.ALL})
    private List<PostTagEntity> postTagList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postOriginFK", cascade = {CascadeType.ALL})
    private List<PostEntity> postOriginList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "commentPostFK")
    private List<CommentEntity> postComments;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postFK", cascade = {CascadeType.ALL})
    private List<PostLikeEntity> postLikList;
}
