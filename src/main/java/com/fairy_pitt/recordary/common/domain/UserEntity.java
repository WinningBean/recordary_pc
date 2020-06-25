package com.fairy_pitt.recordary.common.domain;

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
@Table(name = "USER_TB")
public class UserEntity extends BaseTime {
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
    @Type(type = "text")
    private String userEx;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = CascadeType.REMOVE)
    private List<FollowerEntity> followUser = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "targetFK", cascade = CascadeType.REMOVE)
    private List<FollowerEntity> followTarget = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "gMstUserFK")
    private List<GroupEntity> masters = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = CascadeType.REMOVE)
    private List<GroupMemberEntity> groups = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = CascadeType.REMOVE)
    private List<GroupApplyEntity> applyGroups = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK")
    private List<PostEntity> postList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = CascadeType.REMOVE)
    private List<PostTagEntity> postTagList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = CascadeType.REMOVE)
    private List<PostLikeEntity> postLikeList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFk")
    private  List<ScheduleEntity> scheduleList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFk", cascade = CascadeType.REMOVE)
    private  List<ScheduleTabEntity> scheduleTab = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = CascadeType.REMOVE)
    private List<ScheduleMemberEntity> scheduleMembers = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "commentUserFK", cascade = CascadeType.REMOVE)
    private List<CommentEntity> comments = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK", cascade = CascadeType.REMOVE)
    private List<ToDoEntity> todoList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK")
    private List<ChatEntity> chat = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userFK")
    private List<ChatRoomEntity> chatRoomUser = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "targetFK")
    private List<ChatRoomEntity> chatRoomTarget = new ArrayList<>();

    @Builder
    public UserEntity(String userId, String userPw, String userNm, String userPic){
        this.userId = userId;
        this.userPw = userPw;
        this.userNm = userNm;
        this.userPic = userPic;
    }

    public void update(String userPw, String userNm, String userPic, String userEx){
        if (userPw != null) this.userPw = userPw;
        this.userNm = userNm;
        this.userPic = userPic;
        this.userEx = userEx;
    }
}