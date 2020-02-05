package com.fairy_pitt.recordary.group_member.repository;

import com.fairy_pitt.recordary.group_member.domain.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.group_member.domain.entity.GroupMemberPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMemberEntity, GroupMemberPK> {
}
