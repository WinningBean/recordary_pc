package com.fairy_pitt.recordary.model;

import com.fairy_pitt.recordary.group.domain.entity.GroupEntity;
import com.fairy_pitt.recordary.group_member.domain.entity.MemberEntity;
import com.fairy_pitt.recordary.group_member.domain.entity.MemberPK;
import lombok.Data;
import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "USER_TB")
public class Users {
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

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "gMstUserFK")
    private List<GroupEntity> masters;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userCodeFK")
    private List<MemberEntity> groups;
}