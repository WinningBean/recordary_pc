package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupApplyRepository extends JpaRepository<GroupApplyEntity, GroupMemberPK> {

    public List<GroupApplyEntity> findAllByUserCodeFKAndAndApplyState(UserEntity userEntity, int applyState);
    public List<GroupApplyEntity> findAllByGroupCodeFKAndApplyState(GroupEntity groupEntity, int applyState);
}
