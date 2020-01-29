package com.fairy_pitt.recordary.service.User;

import com.fairy_pitt.recordary.model.Users;
import com.fairy_pitt.recordary.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JoinService {
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UserPasswordHashService userPasswordHashService;

    public String joinUser(String userId, String userPw, String userNm){

        if (userId.equals("") || userPw.equals("") || userNm.equals("")) return "User/join";

        Users user = new Users();
        user.setUserId(userId);
        user.setUserPw(userPasswordHashService.getSHA256(userPw));
        user.setUserNm(userNm);

        usersRepository.save(user);
        return "index";
    }
}
