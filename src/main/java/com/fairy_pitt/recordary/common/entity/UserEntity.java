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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_CD")
    private Long userCd;

    @Column(name = "USER_ID", unique=true, nullable = false)
    private String userId;

    @Column(name = "USER_PW", nullable = false)
    private String userPw;

    @Column(name = "USER_NM", nullable = false)
    private String userNm;

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
    private List<GroupEntity> masters;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userCodeFK")
    private List<GroupMemberEntity> groups;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userCodeFK")
    private List<GroupApplyEntity> applyGroups;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = {CascadeType.ALL})
    private List<PostEntity> postList;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = {CascadeType.ALL})
    private List<PostTagEntity> postTagList;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = {CascadeType.ALL})
    private List<PostLikeEntity> postLikeList;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFk")
    private  List<ScheduleTabEntity> userTab;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userCodeFK")
    private List<ScheduleMemberEntity> scheduleMembers;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "commentUserFK")
    private List<CommentEntity> userComments;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFk")
    private  List<ScheduleEntity> userScheduleList;
   
    @Builder
    public UserEntity(String userId, String userPw, String userNm){
        this.userId = userId;
        this.userPw = userPw;
        this.userNm = userNm;
    }

    public void update(String userPw, String userNm, String userEx){
        this.userPw = userPw;
        this.userNm = userNm;
        this.userEx = userEx;
    }
}