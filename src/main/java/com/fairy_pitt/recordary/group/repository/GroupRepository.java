package com.fairy_pitt.recordary.group.repository;

import com.fairy_pitt.recordary.group.domain.entity.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface GroupRepository extends JpaRepository<GroupEntity, Long> {

//    Optional<GroupEntity> findByGroupCd(long id);
//    List<GroupEntity> findByGNameLike(String s);

    //<GroupEntity> findByGroupCd(long id);
}
