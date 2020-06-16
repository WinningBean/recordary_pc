package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.common.domain.GroupMemberEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMemberRepository extends JpaRepository<GroupMemberEntity, GroupMemberPK> {
    List<GroupEntity> findAllByUserFK(UserEntity userEntity);
    List<UserEntity> findAllByGroupFK(GroupEntity groupEntity);

    GroupMemberEntity findByGroupFKAndUserFK(GroupEntity groupEntity, UserEntity userEntity);
}
