package com.fairy_pitt.recordary.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "USER_TB")
public class UserEntity extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_CD")
    private Long userCd;

    @Column(name = "USER_ID", unique=true, nullable = false)
    private String userId;

    @Column(name = "USER_PW", nullable = false)
    private String userPw;

    @Column(name = "USER_NM", nullable = false)
    private String userNm;

    @Column(name = "USER_PIC")
    private String userPic;

    @Column(name = "USER_EX")
    private String userEx;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = {CascadeType.ALL})
    private List<FollowerEntity> followUser = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "targetFK", cascade = {CascadeType.ALL})
    private List<FollowerEntity> followTarget = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "gMstUserFK")
    private List<GroupEntity> masters = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK")
    private List<GroupMemberEntity> groups = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK")
    private List<GroupApplyEntity> applyGroups = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = {CascadeType.ALL})
    private List<PostEntity> postList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = {CascadeType.ALL})
    private List<PostTagEntity> postTagList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = {CascadeType.ALL})
    private List<PostLikeEntity> postLikeList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFk", cascade = CascadeType.ALL)
    private  List<ScheduleEntity> userScheduleList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFk", cascade = CascadeType.ALL)
    private  List<ScheduleTabEntity> userTab = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = CascadeType.ALL)
    private List<ScheduleMemberEntity> scheduleMembers = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "commentUserFK", cascade = CascadeType.ALL)
    private List<CommentEntity> userComments = new ArrayList<>();

    @Builder
    public UserEntity(String userId, String userPw, String userNm){
        this.userId = userId;
        this.userPw = userPw;
        this.userNm = userNm;
    }

    public void update(String userPw, String userNm, String userPic, String userEx){
        if (userPw != null) this.userPw = userPw;
        this.userNm = userNm;
        this.userPic = userPic;
        this.userEx = userEx;
    }
}