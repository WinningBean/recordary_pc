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
public class GroupApplyEntity  implements Serializable {

    @Id
    @ManyToOne
    private GroupEntity groupCodeFK;

    @Id
    @ManyToOne
    private UserEntity userCodeFK;

    private int applyState;

    @Builder
    public GroupApplyEntity(GroupEntity groupCodeFK, UserEntity userCodeFK, int applyState){

        this.groupCodeFK = groupCodeFK;
        this.userCodeFK = userCodeFK;
        this.applyState = applyState;
    }

}
