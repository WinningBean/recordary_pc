package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUserId(String userId);
    UserEntity findByUserNm(String userNm);
    UserEntity findByUserCd(Long userCd);

    List<UserEntity> findAllByUserNmLike(String userNm);
    List<UserEntity> findAllByUserIdLike(String userId);
    List<UserEntity> findAllByUserNmLikeOrUserIdLike(String userNm, String userId);
}
