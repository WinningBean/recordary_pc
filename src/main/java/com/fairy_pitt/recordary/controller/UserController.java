package com.fairy_pitt.recordary.controller;

import com.fairy_pitt.recordary.service.User.JoinService;
import com.fairy_pitt.recordary.service.User.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
public class UserController {
    @Autowired
    private JoinService joinService;

    @Autowired
    private LoginService loginService;

    @PostMapping(value = "/joinRequest")
    public String joinRequest(@RequestParam Map<String, String> paramMap){
        String userId = paramMap.get("USER_ID");
        String userPw = paramMap.get("USER_PW");
        String userNm = paramMap.get("USER_NM");

        return joinService.joinUser(userId, userPw, userNm);
    }

    @PostMapping(value = "/loginRequest")
    public String loginRequest(@RequestParam Map<String, String> paramMap){
        String userId = paramMap.get("USER_ID");
        String userPw = paramMap.get("USER_PW");

        return loginService.login(userId, userPw);
    }
}
