package com.fairy_pitt.recordary.group.domain.entity;
import com.fairy_pitt.recordary.group_member.domain.entity.MemberEntity;
import com.fairy_pitt.recordary.group_member.domain.entity.MemberPK;
import com.fairy_pitt.recordary.model.Users;
import lombok.*;
import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@Builder
@Entity
@Table(name = "GROUP_TB")
@NoArgsConstructor
@AllArgsConstructor
public class GroupEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GROUP_CD" )
    private Long groupCd;

    @ManyToOne(fetch = FetchType.LAZY)
    private Users gMstUserFK;

    @Column(name = "GROUP_NM")
    private String gName;

    @Column(name = "GROUP_PB_ST")
    private Boolean gState;

    @Column(name = "GROUP_PIC" )
    private String gPic;

    @Column(name = "GROUP_EX")
    private String  gEx;

   @OneToMany(fetch = FetchType.LAZY, mappedBy = "groupCodeFK")
    private List<MemberEntity> members;


}
