package com.fairy_pitt.recordary.endpoint.main;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.endpoint.user.service.UserInfoService;

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

    @GetMapping(value = "/")
    public String Index(){
        return "index";
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

    @ResponseBody
    @GetMapping(value = "/mainPage")
    public Map<String, Object> profileRequest(){
        Map<String, Object> map = new HashMap<>();

        UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");

        List<GroupMemberEntity> result = groupmemberService.readUserGroup(currentUser);
        List<Optional<GroupEntity>> userGroup = new ArrayList<>();
        for (GroupMemberEntity groupMemberEntity :result) {
            Optional<GroupEntity> findResult = groupService.findGroup(groupMemberEntity.getGroupCodeFK());
           userGroup.add(findResult);
        }

        Map<String, Object> groupMap = new HashMap<>();
        for (Optional<GroupEntity> groupEntity :userGroup) {

            GroupEntity groupEntityResult = groupEntity.get();
            groupMap.put(" groupEx",groupEntityResult.getGEx());
        }

        if (currentUser == null) map.put("currentUser","none");
        else{
            Map<String, Object> userMap = new HashMap<>();
            map.put("currentUser", userMap);
            userMap.put("userId", currentUser.getUserId());
            userMap.put("userNm", currentUser.getUserNm());
            userMap.put("userEx", currentUser.getUserEx());        

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
}