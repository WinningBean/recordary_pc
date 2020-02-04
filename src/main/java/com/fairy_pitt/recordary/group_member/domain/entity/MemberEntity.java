package com.fairy_pitt.recordary.group_member.domain.entity;

import com.fairy_pitt.recordary.group.domain.entity.GroupEntity;
import com.fairy_pitt.recordary.model.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="GROUP_MEMBER_TB")
@NoArgsConstructor
@AllArgsConstructor
@IdClass(MemberPK.class)
public class MemberEntity implements Serializable {

    @Id
    @ManyToOne
    private GroupEntity groupCodeFK;

    @Id
    @ManyToOne
    private Users userCodeFK;
}
