package com.fairy_pitt.recordary.endpoint.user;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Transactional
@CrossOrigin
@RestController
@RequestMapping("user")
public class UserController {
    @Autowired private UserService userService;
    @Autowired private HttpSession session;

    @PostMapping(value = "/joinRequest")
    public Map<String, Boolean> joinRequest(@RequestParam Map<String, String> paramMap){
        String userId = paramMap.get("user_id");
        String userPw = paramMap.get("user_pw");
        String userNm = paramMap.get("user_nm");

        Boolean possibleIdState = userService.possibleId(userId);
        Boolean joinState = false;

        if (possibleIdState) joinState = userService.joinUser(userId, userPw, userNm);

        Map<String, Boolean> map = new HashMap<>();
        map.put("isPossibleId", possibleIdState);
        map.put("isJoin", joinState);

        return map;
    }

    @PostMapping(value = "/loginRequest")
    public Map<String, Boolean> loginRequest(@RequestParam Map<String, String> paramMap){
        String userId = paramMap.get("user_id");
        String userPw = paramMap.get("user_pw");

        Boolean loginState = userService.login(userId, userPw);

        Map<String, Boolean> map = new HashMap<>();
        map.put("isLogin", loginState);

        return map;
    }

    @PostMapping(value = "/update")
    public Map<String, Boolean> userUpdate(@RequestParam Map<String, String> paramMap){
        String checkUserPw = paramMap.get("check_user_pw");
        Boolean isChangeUserNm = Boolean.parseBoolean(paramMap.get("is_change_user_nm"));
        String changeUserNm = paramMap.get("change_user_nm");
        Boolean isChangeUserPw = Boolean.parseBoolean(paramMap.get("is_change_user_pw"));
        String changeUserPw = paramMap.get("change_user_pw");

        UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");

        Map<String, Boolean> map = new HashMap<>();
        Boolean checkPwState = false;
        Boolean updateState = false;
        if(changeUserNm.equals("") || changeUserPw.equals("")) updateState =  false;
        else if (userService.checkPw(currentUser, checkUserPw)) {
            checkPwState = true;
            if (isChangeUserNm) userService.updateNm(currentUser, changeUserNm);
            else if (isChangeUserPw) userService.updatePw(currentUser, changeUserPw);
            updateState = true;
        }
        map.put("isCorrect_user_pw", checkPwState);
        map.put("isUpdate", updateState);
        return map;
    }

    @PostMapping(value = "/delete")
    public Map<String, Boolean> userDelete(@RequestParam Map<String, String> paramMap){
        String checkUserPw = paramMap.get("check_user_pw");
        UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");

        Map<String, Boolean> map = new HashMap<>();
        Boolean checkPwState = false;
        Boolean deleteState = false;

        if (checkUserPw.equals("")) deleteState = false;
        else if (userService.checkPw(currentUser, checkUserPw)){
            checkPwState = true;
            userService.delete(currentUser);
            deleteState = true;
        }
        map.put("isCorrect_user_pw", checkPwState);
        map.put("isDelete", deleteState);
        return map;
    }

    @CrossOrigin
    @GetMapping(value = "/search")
    public Map<String, Object> userSearch(@RequestParam(value = "userSearch")String userSearch){
        List<UserEntity> searchedUser = userService.search(userSearch);
        Map<String, Object> map = new HashMap<>();
        map.put("searchedCount", searchedUser.size());

        List UserMapList = new ArrayList();
        for (UserEntity userEntity : searchedUser){
            Map<String, Object> userDetailMap = new HashMap<>();
            userDetailMap.put("user_cd", userEntity.getUserCd());
            userDetailMap.put("user_nm", userEntity.getUserNm());
            userDetailMap.put("user_pic", null);
            userDetailMap.put("user_ex", userEntity.getUserEx());
            UserMapList.add(userDetailMap);
        }
        map.put("searchedUser", UserMapList);

        return map;
    }

}
