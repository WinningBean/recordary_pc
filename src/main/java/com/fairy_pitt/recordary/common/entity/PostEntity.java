package com.fairy_pitt.recordary.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "POST_TB")
public class PostEntity extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "POST_CD")
    private Long postCd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_USER_FK")
    private UserEntity userFK;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_GROUP_FK")
    private GroupEntity groupFK;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_ORIGIN_FK")
    private PostEntity postOriginFK;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_SCHEDULE_FK")
    private ScheduleEntity scheduleFK;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_MEDIA_FK")
    private MediaEntity mediaFK;

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
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postFK", cascade = CascadeType.REMOVE)
    private List<PostTagEntity> postTagList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postOriginFK")
    private List<PostEntity> postOriginList = new ArrayList<>();
    
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postFK", cascade = CascadeType.REMOVE)
    private List<PostLikeEntity> postLikList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "commentPostFK", cascade = CascadeType.REMOVE)
    private List<CommentEntity> postComments = new ArrayList<>();

    @Builder
    public PostEntity(UserEntity userFK,
                      GroupEntity groupFK,
                      PostEntity postOriginFK,
                      ScheduleEntity scheduleFK,
                      MediaEntity mediaFK,
                      String postEx,
                      int postPublicState,
                      String postStrYMD,
                      String postEndYMD){
        this.userFK = userFK;
        this.groupFK = groupFK;
        this.postOriginFK = postOriginFK;
        this.scheduleFK = scheduleFK;
        this.mediaFK = mediaFK;
        this.postEx = postEx;
        this.postPublicState = postPublicState;
        this.postStrYMD = postStrYMD;
        this.postEndYMD = postEndYMD;
    }

    public void update(String postEx, int postPublicState) {
        this.postEx = postEx;
        this.postPublicState = postPublicState;
    }

    public void addMedea(MediaEntity mediaFK){
        this.mediaFK = mediaFK;
    }
}
