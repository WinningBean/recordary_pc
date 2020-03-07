package com.fairy_pitt.recordary.common.pk;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class GroupMemberPK implements Serializable {
    private Long groupCodeFK;
    private Long userCodeFK;
}
