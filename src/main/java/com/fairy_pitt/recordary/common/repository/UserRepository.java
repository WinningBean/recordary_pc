package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.endpoint.user.service.UserPasswordHashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUserCd(Long userCd);
    UserEntity findByUserId(String userId);
    UserEntity findByUserNm(String userNm);
    UserEntity findByUserPw(String userPw);
    UserEntity findByUserIdAndUserPw(String userId, String userPw);

    List<UserEntity> findAllByUserNmLike(String userNm);
    List<UserEntity> findAllByUserIdLike(String userId);
    List<UserEntity> findAllByUserNmLikeOrUserIdLike(String userNm, String userId);
}
