package com.fairy_pitt.recordary.common.entity;

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

    @ManyToOne
    @JoinColumn(name = "POST_SCHEDULE_FK")
    private ScheduleEntity scheduleFK;

    @ManyToOne
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

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postCodeFK")
    private List<ScheduleEntity> postSchedules;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postFK", cascade = {CascadeType.ALL})
    private List<PostTagEntity> postTagList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postOriginFK", cascade = {CascadeType.ALL})
    private List<PostEntity> postOriginList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "postFK", cascade = {CascadeType.ALL})
    private List<PostLikeEntity> postLikList;

    @Builder
    public PostEntity(String postEx, int postPublicState, String postStrYMD, String postEndYMD){
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
