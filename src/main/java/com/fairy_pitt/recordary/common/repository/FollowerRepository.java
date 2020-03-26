package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.FollowerEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.pk.FollowerPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowerRepository extends JpaRepository<FollowerEntity, FollowerPK> {
    FollowerEntity findByUserFKAndTargetFK(UserEntity userFK, UserEntity targetFK);

    List<FollowerEntity> findAllByUserFK(UserEntity userFK);
    List<FollowerEntity> findAllByTargetFK(UserEntity targetFK);
}
