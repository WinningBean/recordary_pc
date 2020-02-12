package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, Long> {

     List<GroupEntity> findBygNameLike(String gName);//findByContentLike
     GroupEntity findByGroupCd(Long groupCd);
     List<GroupEntity> findAllBygState(boolean state);

}
