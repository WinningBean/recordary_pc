package com.fairy_pitt.recordary.repository;

import com.fairy_pitt.recordary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserIdAndUserPw(String userId, String userPw);
}
