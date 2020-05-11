package com.fairy_pitt.recordary.common.entity;

import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@NoArgsConstructor
@IdClass(GroupMemberPK.class)
@Table(name="GROUP_APPLY_TB")
@Entity
public class GroupApplyEntity extends BaseTimeEntity implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GROUP_FK")
    private GroupEntity groupFK;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GROUP_USER_FK")
    private UserEntity userFK;

    @Column(name = "GROUP_APPLY_ST")
    private int applyState;

    @Builder
    public GroupApplyEntity(GroupEntity groupFK, UserEntity userFK, int applyState){

        this.groupFK = groupFK;
        this.userFK = userFK;
        this.applyState = applyState;
    }

}
