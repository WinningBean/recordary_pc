package com.fairy_pitt.recordary.common.entity;

import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="GROUP_APPLY_TB")
@AllArgsConstructor
//@IdClass(GroupMemberPK.class)
public class GroupApplyEntity  implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GROUP_APPLY_CD" )
    private Long groupApplyCd;

    @ManyToOne
    private GroupEntity groupCodeFK;

    @ManyToOne
    private UserEntity userCodeFK;

    private int applyState;

    @Builder
    public GroupApplyEntity(GroupEntity groupCodeFK, UserEntity userCodeFK, int applyState) {

        this.groupCodeFK = groupCodeFK;
        this.userCodeFK = userCodeFK;
        this.applyState = applyState;
    }

}
