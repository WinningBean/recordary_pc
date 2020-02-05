package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUserCd(Long userCd);
    UserEntity findByUserId(String userId);
    List<UserEntity> findByUserNmLike(String userId);
    UserEntity findByUserNm(String userNm);
    UserEntity findByUserIdAndUserPw(String userId, String userPw);
}
