package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, Long> {
     GroupEntity findByGroupCd(Long groupCd);
     List<GroupEntity> findByGroupNmLike(String groupNm);//findByContentLike
     List<GroupEntity> findAllByGroupState(boolean state);
     List<GroupEntity> findBygMstUserFK(UserEntity user);
}
