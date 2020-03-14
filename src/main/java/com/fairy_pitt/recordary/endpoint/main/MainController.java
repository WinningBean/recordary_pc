package com.fairy_pitt.recordary.endpoint.main;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.common.entity.UserEntity;

import com.fairy_pitt.recordary.endpoint.user.service.UserService;
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

    @Autowired private GroupService groupService;
    @Autowired private GroupMemberService groupmemberService;
    @Autowired private FollowerService followerService;
    @Autowired private HttpSession session;
    @Autowired private UserService userService;

    @GetMapping(value = "/")
    public String Index(){
        return "index";
    }

    @ResponseBody
    @GetMapping("/checkUser")
    public Map<String, Boolean> checkUser(){
        Map<String, Boolean> map = new HashMap<>();
        Boolean userState = false;

        UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");
        if (currentUser != null) userState = true;

        map.put("isCurrentUser", userState);
        return map;
    }

    @ResponseBody
    @PostMapping("/checkSession")
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

    @CrossOrigin
    @ResponseBody
    @GetMapping("/mainPage")
    public Map<String, Object> profileRequest(){
        Map<String, Object> map = new HashMap<>();

       /* UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");

        if (currentUser == null) map.put("currentUser",null);
        else {
            map.put("currentUser", userService.userInfo(currentUser.getUserId()));

            List<GroupMemberEntity> groupMemberEntities = groupmemberService.readUserGroup(currentUser);
            List<Optional<GroupEntity>> userGroup = new ArrayList<>();
            for (GroupMemberEntity groupMemberEntity :groupMemberEntities) {
                Optional<GroupEntity> findResult = groupService.findGroup(groupMemberEntity.getGroupCodeFK());
               userGroup.add(findResult);
            }

            List groupMapList = new ArrayList();
            for (Optional<GroupEntity> groupEntity :userGroup) {
                Map<String, Object> groupMap = new HashMap<>();
                GroupEntity groupEntityResult = groupEntity.get();
             *//*   groupMap.put("group_ex",groupEntityResult.getGEx());
                groupMap.put("group_nm",groupEntityResult.getGName());
                groupMap.put("group_cd",groupEntityResult.getGroupCd());
                groupMap.put("group_pic",groupEntityResult.getGPic());
                groupMap.put("group_state", groupEntityResult.getGState());*//*

                String master = groupEntityResult.getGMstUserFK().getUserId();
                boolean checkMaster;
                checkMaster = master.equals(currentUser.getUserId());

                groupMap.put("adminCheck", checkMaster);
                groupMap.put("group_admin", master);

                groupMapList.add(groupMap);
            }
            map.put("userGroup", groupMapList);

            List<UserEntity> friendList = followerService.friends(currentUser.getUserCd());
            List friendMapList = new ArrayList();
            for (UserEntity friend : friendList) {
                friendMapList.add(userService.userInfo(friend.getUserId()));
            }
            map.put("friendList", friendMapList);
        }*/
        return map;
    }

    @ResponseBody
    @GetMapping("/{userId}")
    public Map<String, Object> userProfile(@PathVariable("userId") String userId){
        Map<String, Object> map = new HashMap<>();
        map.put("userInfo", userService.userInfo(userId));
        return map;
    }
}