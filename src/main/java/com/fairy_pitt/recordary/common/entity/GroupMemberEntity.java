package com.fairy_pitt.recordary.common.entity;

import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.stream.DoubleStream;

@Data
@Entity
@Table(name="GROUP_MEMBER_TB")
//@IdClass(GroupMemberPK.class)
public class GroupMemberEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GROUP_MEMBER_CD" )
    private Long groupMemberCd;

    @ManyToOne
    private GroupEntity groupCodeFK;

    @ManyToOne
    private UserEntity userCodeFK;

    @Builder
    public GroupMemberEntity(GroupEntity groupCodeFK,UserEntity userCodeFK) {

        this.groupCodeFK = groupCodeFK;
        this.userCodeFK = userCodeFK;
    }
}
