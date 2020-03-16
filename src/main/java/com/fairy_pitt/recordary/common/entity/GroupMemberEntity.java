package com.fairy_pitt.recordary.common.entity;

import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import lombok.*;
import javax.persistence.*;
import java.io.Serializable;
import java.util.stream.DoubleStream;

@Getter
@Table(name="GROUP_MEMBER_TB")
@IdClass(GroupMemberPK.class)
@Entity
public class GroupMemberEntity implements Serializable {

    @Id
    @ManyToOne
    private GroupEntity groupCodeFK;

    @Id
    @ManyToOne
    private UserEntity userCodeFK;

    @Builder
    public GroupMemberEntity(GroupEntity groupCodeFK,UserEntity userCodeFK) {

        this.groupCodeFK = groupCodeFK;
        this.userCodeFK = userCodeFK;
    }
}
