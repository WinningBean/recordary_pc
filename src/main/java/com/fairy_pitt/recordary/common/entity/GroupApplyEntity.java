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
    private GroupEntity groupFK;

    @Id
    @ManyToOne
    private UserEntity userFK;

    private int applyState;

    @Builder
    public GroupApplyEntity(GroupEntity groupFK, UserEntity userFK, int applyState){

        this.groupFK = groupFK;
        this.userFK = userFK;
        this.applyState = applyState;
    }

}
