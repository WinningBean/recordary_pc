package com.fairy_pitt.recordary.group_member.repository;

import com.fairy_pitt.recordary.group_member.domain.entity.MemberEntity;
import com.fairy_pitt.recordary.group_member.domain.entity.MemberPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity,MemberPK> {
}
