package com.fairy_pitt.recordary.service.User;

import com.fairy_pitt.recordary.model.Users;
import com.fairy_pitt.recordary.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class LoginService {
    @Autowired
    private UserPasswordHashService userPasswordHashService;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    HttpSession session;

    public String login(String userId, String userPw){
        if (userId.equals("") || userPw.equals("")) return "login";

        String hashedPassword = userPasswordHashService.getSHA256(userPw);
        Users user = usersRepository.findByUserIdAndUserPw(userId, hashedPassword);
        if (user == null) return "login";

        session.setAttribute("loginUser", user);

        return "index";
    }
}
