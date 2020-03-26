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
    private Long groupFK;
    private Long userFK;

    public GroupMemberPK(Long groupFK,Long userFK)
    {
        this.groupFK = groupFK;
        this.userFK = userFK;
    }

}
