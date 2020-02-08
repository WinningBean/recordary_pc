package com.fairy_pitt.recordary.controller;

import com.fairy_pitt.recordary.model.Users;
import com.fairy_pitt.recordary.repository.UsersRepository;
import com.fairy_pitt.recordary.service.User.JoinService;
import com.fairy_pitt.recordary.service.User.LoginService;
import com.fairy_pitt.recordary.service.User.UsersInfoService;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
public class UsersController {
    @Autowired
    private JoinService joinService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private UsersInfoService usersInfoService;

//    @CrossOrigin
    @PostMapping(value = "/joinRequest")
    public Map<String, Boolean> joinRequest(@RequestParam Map<String, String> paramMap){
        String userId = paramMap.get("user_id");
        String userPw = paramMap.get("user_pw");
        String userNm = paramMap.get("user_nm");

        Boolean possibleIdState = joinService.possibleId(userId);
        Boolean joinState = false;

        if (possibleIdState) joinState = joinService.joinUser(userId, userPw, userNm);

        Map<String, Boolean> map = new HashMap<>();
        map.put("isPossibleId", possibleIdState);
        map.put("isJoin", joinState);

        return map;
    }

//    @CrossOrigin
    @PostMapping(value = "/loginRequest")
    public Map<String, Boolean> loginRequest(@RequestParam Map<String, String> paramMap){
        String userId = paramMap.get("user_id");
        String userPw = paramMap.get("user_pw");

        Boolean loginState = loginService.login(userId, userPw);

        Map<String, Boolean> map = new HashMap<>();
        map.put("isLogin", loginState);

        return map;
    }

    @Autowired
    private UsersRepository usersRepository;

    @PostMapping(value = "/userUpdate")
    public Map<String, Boolean> userUpdate(@RequestParam Map<String, String> paramMap){
        Long userCd = Long.parseLong(paramMap.get("user_cd"));
        String userNm = paramMap.get("user_nm");
        String userPw = paramMap.get("user_pw");
        String userEx = paramMap.get("user_ex");

        Map<String, Boolean> map = new HashMap<>();
        Boolean updateState = true;
        if(userNm.equals("") || userPw.equals("")) updateState =  false;
        else usersInfoService.update(userCd, userNm, userPw, userEx);
        map.put("updateState", updateState);
        return map;
    }

    @GetMapping(value = "/userSearch")
    public Map<String, String> userSearch(@RequestParam(value = "userSearch")String userSearch){
        Users searchedUser = usersInfoService.search(userSearch);
        Map<String, String> map = new HashMap<>();
        map.put("searched_user", searchedUser.getUserId());
        return map;
    }
}
