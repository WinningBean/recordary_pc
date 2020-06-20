package com.fairy_pitt.recordary.common.domain;

import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Table(name="GROUP_MEMBER_TB")
@IdClass(GroupMemberPK.class)
@NoArgsConstructor
@Entity
public class GroupMemberEntity extends BaseTime implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GROUP_FK", nullable = false)
    private GroupEntity groupFK;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GROUP_USER_FK", nullable = false)
    private UserEntity userFK;

    @Builder
    public GroupMemberEntity(GroupEntity groupFK,UserEntity userFK) {

        this.groupFK = groupFK;
        this.userFK = userFK;
    }
}
