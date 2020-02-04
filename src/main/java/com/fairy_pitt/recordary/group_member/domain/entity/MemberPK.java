package com.fairy_pitt.recordary.group_member.domain.entity;

import com.fairy_pitt.recordary.group.domain.entity.GroupEntity;
import com.fairy_pitt.recordary.model.Users;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Embeddable
public class MemberPK implements Serializable {

    private Long groupCodeFK;
    private Long userCodeFK;

}
