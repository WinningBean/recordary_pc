package com.fairy_pitt.recordary.common.pk;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
public class GroupMemberPK implements Serializable {
    private Long groupCodeFK;
    private Long userCodeFK;

    public GroupMemberPK(Long groupCodeFK,Long userCodeFK)
    {
        this.groupCodeFK = groupCodeFK;
        this.userCodeFK = userCodeFK;
    }

}
