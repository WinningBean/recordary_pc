package com.fairy_pitt.recordary.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "POST_TB")
public class PostEntity extends BaseTimeEntity{
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

    @OneToOne
    @JoinColumn(name = "POST_SCHEDULE_FK")
    private ScheduleEntity scheduleFK;


    @Column(name = "POST_EX")
    @Type(type = "text")
    private String postEx;

    @Column(name = "POST_PB_ST", nullable = false)
    private int postPublicState;

    @Column(name = "POST_STR_YMD")
    private String postStrYMD;

    @Column(name = "POST_END_YMD")
    private String postEndYMD;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postFK", cascade = {CascadeType.ALL})
    private List<PostTagEntity> postTagList;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postOriginFK", cascade = {CascadeType.ALL})
    private List<PostEntity> postOriginList;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "commentPostFK")
    private List<CommentEntity> postComments;
    
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postFK", cascade = {CascadeType.ALL})
    private List<PostLikeEntity> postLikList;

    @Builder
    public PostEntity(UserEntity userFK,
                      GroupEntity groupFK,
                      PostEntity postOriginFK,
                      ScheduleEntity scheduleFK,
                      String postEx,
                      int postPublicState,
                      String postStrYMD,
                      String postEndYMD){
        this.userFK = userFK;
        this.groupFK = groupFK;
        this.postOriginFK = postOriginFK;
        this.scheduleFK = scheduleFK;
        this.postEx = postEx;
        this.postPublicState = postPublicState;
        this.postStrYMD = postStrYMD;
        this.postEndYMD = postEndYMD;
    }

    public void update(String postEx, int postPublicState) {
        this.postEx = postEx;
        this.postPublicState = postPublicState;
    }
}
