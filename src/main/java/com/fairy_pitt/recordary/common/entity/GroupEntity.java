package com.fairy_pitt.recordary.common.entity;

import lombok.*;
import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@Builder
@Entity
@Table(name = "GROUP_TB")
@NoArgsConstructor
@AllArgsConstructor
public class GroupEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GROUP_CD" )
    private Long groupCd;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserEntity gMstUserFK;

    @Column(name = "GROUP_NM")
    private String gName;

    @Column(name = "GROUP_PB_ST")
    private Boolean gState;

    @Column(name = "GROUP_PIC" )
    private String gPic;

    @Column(name = "GROUP_EX")
    private String  gEx;

   @OneToMany(fetch = FetchType.LAZY, mappedBy = "groupCodeFK")
    private List<GroupMemberEntity> members;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "groupFK")
    private List<PostEntity> postEntityList;
}
