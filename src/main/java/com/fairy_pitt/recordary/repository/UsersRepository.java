package com.fairy_pitt.recordary.repository;

import com.fairy_pitt.recordary.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByUserCd(Long userCd);
    Users findByUserId(String userId);
    Users findByUserNm(String userNm);
    Users findByUserIdAndUserPw(String userId, String userPw);
}
