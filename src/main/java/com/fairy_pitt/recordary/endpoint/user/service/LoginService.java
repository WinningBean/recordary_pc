package com.fairy_pitt.recordary.endpoint.user.service;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class LoginService {
    @Autowired
    private UserPasswordHashService userPasswordHashService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    HttpSession session;

    public Boolean login(String userId, String userPw){
        if (userId.equals("") || userPw.equals("")) return false;

        String hashedPassword = userPasswordHashService.getSHA256(userPw);
        UserEntity user = userRepository.findByUserIdAndUserPw(userId, hashedPassword);
        if (user == null) return false;

        session.setAttribute("loginUser", user);

        return true;
    }
}
