package com.fairy_pitt.recordary.common.entity;

import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import lombok.*;
import javax.persistence.*;
import java.io.Serializable;
import java.util.stream.DoubleStream;

@Getter
@Table(name="GROUP_MEMBER_TB")
@IdClass(GroupMemberPK.class)
@NoArgsConstructor
@Entity
public class GroupMemberEntity implements Serializable {

    @Id
    @ManyToOne
    private GroupEntity groupFK;

    @Id
    @ManyToOne
    private UserEntity userFK;

    @Builder
    public GroupMemberEntity(GroupEntity groupFK,UserEntity userFK) {

        this.groupFK = groupFK;
        this.userFK = userFK;
    }
}
