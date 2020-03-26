package com.fairy_pitt.recordary.endpoint.main;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
//import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
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
    @Autowired
    private UserService userService;
    @Autowired
    private FollowerService followerService;
    @Autowired
    private GroupService groupService;
    @Autowired
    private GroupMemberService groupmemberService;

    @GetMapping("/groupCreatePage")
    public String createGroup(){
        return "group/create";
    }

    @ResponseBody
    @GetMapping("/mainPage")
    public Map<String, Object> profileRequest(){
        Map<String, Object> map = new HashMap<>();

        UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");

        if (currentUser == null) map.put("currentUser",null);
        else {
//            map.put("currentUser", userService.userInfo(currentUser.getUserId()));

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
                groupMap.put("group_ex",groupEntityResult.getGEx());
                groupMap.put("group_nm",groupEntityResult.getGName());
                groupMap.put("group_cd",groupEntityResult.getGroupCd());
                groupMap.put("group_pic",groupEntityResult.getGPic());
                groupMap.put("group_state", groupEntityResult.getGState());
                groupMapList.add(groupMap);
            }
            map.put("userGroup", groupMapList);

            List<UserResponseDto> friendList = followerService.friends(userService.currentUserId());
            map.put("friendList", friendList);
        }
        return map;
    }
}