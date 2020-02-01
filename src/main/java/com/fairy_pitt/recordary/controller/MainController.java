package com.fairy_pitt.recordary.controller;

import com.fairy_pitt.recordary.model.Users;
import com.fairy_pitt.recordary.service.User.UsersInfoService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@Controller
public class MainController {

    @Autowired
    private HttpSession session;

    @GetMapping(value = "/")
    public String Index(){
        return "index";
    }

    /* User */
    @RequestMapping(value = "/joinPage")
    public String joinPage(){
        return "User/join";
    }

    @RequestMapping(value = "/loginPage")
    public String loginPage(){
        return "User/login";
    }

    @GetMapping("/logout")
    public String logout(){
//        session.invalidate();
        session.removeAttribute("loginUser");
        return "index";
    }

    @Autowired private UsersInfoService usersInfoService;

    @ResponseBody
    @GetMapping(value = "/userDelete")
    public String userDelete(){
        Users currentUser = (Users)session.getAttribute("loginUser");
        usersInfoService.delete(currentUser);
        return "complete";
    }

    @ResponseBody
    @GetMapping(value = "/mainPage")
    public Map<String, Object> profileRequest(){
        Map<String, Object> map = new HashMap<>();

        Users currentUser = (Users)session.getAttribute("loginUser");
        if (currentUser == null) map.put("currentUser","none");
        else{
            Map<String, Object> userMap = new HashMap<>();
            map.put("currentUser", userMap);
            userMap.put("userId", currentUser.getUserId());
            userMap.put("userNm", currentUser.getUserNm());
            userMap.put("userEx", currentUser.getUserEx());

            List groupList = new ArrayList();
            groupList.add("그룹1");
            groupList.add("그룹2");
            groupList.add("그룹3");

            List groupMapList = new ArrayList();
            for (int i = 0; i < groupList.size(); i++){
                Map<String, Object> groupDetailMap = new HashMap<>();
                groupDetailMap.put("groupCd", i+1);
                groupDetailMap.put("groupPic", "none");
                groupDetailMap.put("groupNm", (String)groupList.get(i));
                groupMapList.add(groupDetailMap);
            }
            map.put("userGroup", groupMapList);

            List friendList = new ArrayList();
            friendList.add("일깅동");
            friendList.add("이길동");
            friendList.add("삼길동");

            List friendMapList = new ArrayList();
            for (int i = 0; i < friendList.size(); i++){
                Map<String, Object> friendDetailMap = new HashMap<>();
                friendDetailMap.put("friendCd", i+1);
                friendDetailMap.put("friendPic", "none");
                friendDetailMap.put("friendNm", (String)friendList.get(i));
                friendMapList.add(friendDetailMap);
            }
            map.put("userFriend", friendMapList);
        }
        return map;
    }

//    @CrossOrigin
    @ResponseBody
    @GetMapping(value = "/test")
    public Map<String, String> Test() {
        Map<String, String> map = new HashMap<>();
        map.put("Test", "test");

        return map;
    }

//    @CrossOrigin
    @ResponseBody
    @PostMapping(value = "/testResult")
    public String TestResult(@RequestBody Map<String, Object> param){
        String str = (String)((Map)param.get("cc")).get("cc1");
        return str;
    }
}