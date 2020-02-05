package com.fairy_pitt.recordary.controller;


import com.fairy_pitt.recordary.group.domain.entity.GroupEntity;
import com.fairy_pitt.recordary.group.service.GroupService;
import com.fairy_pitt.recordary.group_member.domain.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.group_member.service.GroupMemberService;
import com.fairy_pitt.recordary.model.Users;
import com.fairy_pitt.recordary.service.User.UsersInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.*;

@Transactional
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

    @Autowired private UsersInfoService usersInfoService;
    @Autowired private GroupService groupService;
    @Autowired private GroupMemberService groupmemberService;

    @GetMapping(value = "/userInfo")
    public String userInfo(){
        return "User/userInfo";
    }

    @ResponseBody
    @GetMapping(value = "/userDelete")
    public String userDelete(){
        Users currentUser = (Users)session.getAttribute("loginUser");
        usersInfoService.delete(currentUser);
        return "complete";
    }

    @ResponseBody
    @GetMapping(value = "profile")
    public Map<String, Object> profileRequest(){
        Map<String, Object> map = new HashMap<>();

        Users currentUser = (Users)session.getAttribute("loginUser");

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



            map.put("userGroup", groupMap);
//            groupMap.put("groupCount", 3);
//            for (int i = 0; i < groupList.size(); i++){
//                Map<String, Object> groupDetailMap = new HashMap<>();
//                groupMap.put("group" + (i+1), groupDetailMap);
//                groupDetailMap.put("groupPic", "none");
//                groupDetailMap.put("groupNm", (String)groupList.get(i));
//            }
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