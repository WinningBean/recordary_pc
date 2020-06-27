package com.fairy_pitt.recordary.common.domain;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Table(name = "GROUP_TB")
@NoArgsConstructor
@Entity
public class GroupEntity extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GROUP_CD" )
    private Long groupCd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GROUP_MST_FK")
    private UserEntity gMstUserFK;

    @Column(name = "GROUP_NM", nullable = false)
    private String groupNm;

    @Column(name = "GROUP_PB_ST", nullable = false)
    private Boolean groupState;

    @Column(name = "GROUP_PIC")
    private String groupPic;

    @Column(name = "GROUP_EX")
    @Type(type = "text")
    private String  groupEx;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "groupFK", cascade = CascadeType.REMOVE)
    private List<GroupMemberEntity> members = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "groupFK", cascade = CascadeType.REMOVE)
    private List<GroupApplyEntity> applyMembers = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "groupFK", cascade = CascadeType.REMOVE)
    private List<PostEntity> postEntityList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "groupFK", cascade = CascadeType.REMOVE)
    private  List<ScheduleEntity> groupScheduleList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "groupFK", cascade = CascadeType.REMOVE)
    private List<ChatRoomEntity> groupChatRoomList = new ArrayList<>();

    @Builder
    public GroupEntity(UserEntity gMstUserFK,
                       String groupNm,
                       Boolean groupState,
                       String groupPic,
                       String  groupEx) {

        this.gMstUserFK = gMstUserFK;
        this.groupNm = groupNm;
        this.groupState = groupState;
        this.groupPic = groupPic;
        this.groupEx = groupEx;
    }

    public void updateGroupInfo(String groupNm,
                                Boolean groupState,
                                String  groupEx) {
        this.groupNm = groupNm;
        this.groupState = groupState;
        this.groupEx = groupEx;
    }

    public void updateGroupMaster(UserEntity user) {
        this.gMstUserFK = user;
    }
    public void updateGroupProfile(String url){this.groupPic = url;}

    public String getProfilePath(){
        AmazonS3 amazonS3Client = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.AP_NORTHEAST_2)
                .build();
        String bucketName = "recordary-springboot-upload";
        return amazonS3Client.getUrl(bucketName, groupPic).toString();
    }
}
