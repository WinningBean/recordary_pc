package com.fairy_pitt.recordary.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@Table(name = "GROUP_TB")
@NoArgsConstructor
@Entity
public class GroupEntity extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GROUP_CD" )
    private Long groupCd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GROUP_MST_FK")
    private UserEntity gMstUserFK;

    @Column(name = "GROUP_NM")
    private String groupName;

    @Column(name = "GROUP_PB_ST" )
    private Boolean groupState;

    @Column(name = "GROUP_PIC" )
    private String groupPic;

    @Column(name = "GROUP_EX")
    private String  groupEx;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "groupFK")
    private List<GroupMemberEntity> members;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "groupFK")
    private List<GroupApplyEntity> applyMembers;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "groupFK")
    private List<PostEntity> postEntityList;

    @Builder
    public GroupEntity(UserEntity gMstUserFK,
                       String groupName,
                       Boolean groupState,
                       String groupPic,
                       String  groupEx) {

        this.gMstUserFK = gMstUserFK;
        this.groupName = groupName;
        this.groupState = groupState;
        this.groupPic = groupPic;
        this.groupEx = groupEx;
    }

    public void updateGroupInfo(String groupName,
                                Boolean groupState,
                                String groupPic,
                                String  groupEx) {
        this.groupName = groupName;
        this.groupState = groupState;
        this.groupPic = groupPic;
        this.groupEx = groupEx;
    }

    public void updateGroupMaster(UserEntity User) {
        this.gMstUserFK = User;
    }
}
