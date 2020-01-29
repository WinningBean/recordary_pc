package com.fairy_pitt.recordary.repository;

import com.fairy_pitt.recordary.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByUserIdAndUserPw(String userId, String userPw);
}
