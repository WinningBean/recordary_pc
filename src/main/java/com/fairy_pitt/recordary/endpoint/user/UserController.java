package com.fairy_pitt.recordary.endpoint.user;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.user.service.JoinService;
import com.fairy_pitt.recordary.endpoint.user.service.LoginService;
import com.fairy_pitt.recordary.endpoint.user.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class UserController {
    @Autowired
    private JoinService joinService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserInfoService userInfoService;

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
    private UserRepository userRepository;

    @PostMapping(value = "/userUpdate")
    public Map<String, Boolean> userUpdate(@RequestParam Map<String, String> paramMap){
        Long userCd = Long.parseLong(paramMap.get("user_cd"));
        String userNm = paramMap.get("user_nm");
        String userPw = paramMap.get("user_pw");
        String userEx = paramMap.get("user_ex");

        Map<String, Boolean> map = new HashMap<>();
        Boolean updateState = true;
        if(userNm.equals("") || userPw.equals("")) updateState =  false;
        else userInfoService.update(userCd, userNm, userPw, userEx);
        map.put("updateState", updateState);
        return map;
    }

    @GetMapping(value = "/userSearch")
    public Map<String, Object> userSearch(@RequestParam(value = "userSearch")String userSearch){
        List<UserEntity> searchedUser = userInfoService.search(userSearch);
        Map<String, Object> map = new HashMap<>();
        map.put("searchedUserCount", searchedUser.size());

        List UserMapList = new ArrayList();
        for (int i = 0; i < searchedUser.size(); i++){
            Map<String, Object> userDetailMap = new HashMap<>();
            userDetailMap.put("groupCd", searchedUser.get(i).getUserCd());
            userDetailMap.put("groupPic", "none");
            userDetailMap.put("groupNm", searchedUser.get(i).getUserNm());
            UserMapList.add(userDetailMap);
        }
        map.put("searedUser", UserMapList);

        return map;
    }
}
