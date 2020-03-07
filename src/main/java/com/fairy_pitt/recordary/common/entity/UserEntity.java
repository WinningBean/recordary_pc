package com.fairy_pitt.recordary.common.entity;

import lombok.Data;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "USER_TB")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_CD")
    private Long userCd;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "USER_PW")
    private String userPw;

    @Column(name = "USER_NM")
    private String userNm;

    @Column(name = "USER_EX")
    private String userEx;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = {CascadeType.ALL})
    private List<FollowerEntity> followUser = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "targetFK", cascade = {CascadeType.ALL})
    private List<FollowerEntity> followTarget = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "gMstUserFK")
    private List<GroupEntity> masters;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userCodeFK")
    private List<GroupMemberEntity> groups;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userCodeFK")
    private List<GroupApplyEntity> applyGroups;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = {CascadeType.ALL})
    private List<PostEntity> postList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = {CascadeType.ALL})
    private List<PostTagEntity> postTagList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tabUserFk")
    private  List<ScheduleTabEntity> userTab;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userCodeFK")
    private List<ScheduleMemberEntity> scheduleMembers;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "commentUserFK")
    private List<CommentEntity> userComments;
}