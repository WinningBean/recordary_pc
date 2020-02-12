package com.fairy_pitt.recordary.endpoint.main;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.common.entity.UserEntity;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Transactional
@CrossOrigin
@Controller
public class MainController {

    @Autowired private HttpSession session;

//    @GetMapping(value = "/")
//    public String Index(){
//        return "loginPage";
//    }

    @GetMapping("/checkSession")
    public Map<String, Boolean> checkSession(@RequestParam Map<String, String> paramMap){
        Map<String, Boolean> map = new HashMap<>();
        Boolean sessionState = false;

        UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");
        if (currentUser.getUserCd().equals(paramMap.get("user_cd"))) sessionState = true;

        map.put("isSessionUser", sessionState);
        return map;
    }

    @GetMapping("/groupCreatePage")
    public String createGroup(){
        return "group/create";
    }

    @GetMapping("/logout")
    public String logout(){
//        session.invalidate();
        session.removeAttribute("loginUser");
        return "index";
    }

    @Autowired private GroupService groupService;
    @Autowired private GroupMemberService groupmemberService;
    @Autowired private FollowerService followerService;

    @ResponseBody
    @GetMapping("/mainPage")
    public Map<String, Object> profileRequest(){
        Map<String, Object> map = new HashMap<>();

        UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");

        if (currentUser == null) map.put("currentUser",null);
        else {
            Map<String, Object> userMap = new HashMap<>();
            map.put("currentUser", userMap);
            userMap.put("user_id", currentUser.getUserId());
            userMap.put("user_nm", currentUser.getUserNm());
            userMap.put("user_ex", currentUser.getUserEx());

            List<GroupMemberEntity> groupMemberEntities = groupmemberService.readUserGroup(currentUser);
            List<Optional<GroupEntity>> userGroup = new ArrayList<>();
            for (GroupMemberEntity groupMemberEntity :groupMemberEntities) {
                Optional<GroupEntity> findResult = groupService.findGroup(groupMemberEntity.getGroupCodeFK());
               userGroup.add(findResult);
            }

            Map<String, Object> groupMap = new HashMap<>();
            for (Optional<GroupEntity> groupEntity :userGroup) {
                GroupEntity groupEntityResult = groupEntity.get();
                groupMap.put(" groupEx",groupEntityResult.getGEx());
            }

            List<UserEntity> friendList = followerService.friends(currentUser.getUserCd());

            List friendMapList = new ArrayList();
            for (int i = 0; i < friendList.size(); i++) {
                Map<String, Object> friendDetailMap = new HashMap<>();
                friendDetailMap.put("friend_user_cd", friendList.get(i).getUserCd());
                friendDetailMap.put("friend_user_nm", friendList.get(i).getUserNm());
                friendDetailMap.put("friend_user_pic", null);
                friendDetailMap.put("friend_user_ex", friendList.get(i).getUserEx());
                friendMapList.add(friendDetailMap);
            }
            map.put("friendList", friendMapList);
        }
        return map;
    }
}