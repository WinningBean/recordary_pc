package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.endpoint.user.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Transactional
@RequestMapping("group")
public class GroupController {

    @Autowired
    private HttpSession session;

    @Autowired
    private  GroupService groupService ;

    @Autowired
    private GroupMemberService groupMemberService ;

    @Autowired
    private UserInfoService userInfoService;

    @ResponseBody
    @PostMapping("create") // 그룹 생성
    public Map<String,Boolean> CreateGroup(@RequestParam Map<String, Object> groupInfo) {
        UserEntity currUser = (UserEntity) session.getAttribute("loginUser");

        GroupEntity groupEntity = new GroupEntity();
        GroupMemberEntity groupMemberEntity = new GroupMemberEntity();

        groupEntity.setGName((String)groupInfo.get("group_name"));
        groupEntity.setGEx((String) groupInfo.get("group_ex"));
        groupEntity.setGState(true);
//        if(groupInfo.get("group_state") == "true")
//        {
//            groupEntity.setGState(true);
//        }else {
//            groupEntity.setGState(false);
//        }

        groupEntity.setGMstUserFK(currUser);
        GroupEntity groupCreate = groupService.groupCreate(groupEntity);

        groupMemberEntity.setUserCodeFK(currUser);
        groupMemberEntity.setGroupCodeFK(groupCreate);
        boolean groupCreateComplete = groupMemberService.insertMember(groupMemberEntity);

        Map<String, Boolean> result = new HashMap<>();
        result.put("isCreate", groupCreateComplete );

        return result;
    }

    @ResponseBody
    @PostMapping("search") // 그룹 검색
    public Map<String,Object> SearchGroup(@RequestParam(value = "groupSearch") String groupSearch)
    {
        Map<String, Object> groupMap = new HashMap<>();
        List<GroupEntity> searchResult = groupService.groupSearch(groupSearch);

        for (GroupEntity groupEntity:searchResult) {
            if(groupEntity.getGState() == true)
            {
                groupMap.put("group_name",groupEntity.getGName());
                groupMap.put("group_ex",groupEntity.getGEx());
                groupMap.put("groupPic",groupEntity.getGPic());
            }else continue;

        }
        return groupMap;
    }

    @ResponseBody
    @GetMapping("delete/{id}")
    public String DeleteGroup(@PathVariable("id") long id)
    {
        groupService.GroupDelete(id);
        return "success";
    }

    //그룹 정보수정
    @ResponseBody
    @GetMapping("update/{id}")
    public String UpdateGroup(@PathVariable("id") long id, @RequestParam Map<String,Object> groupInfo)
    {
        GroupEntity groupEntity = new GroupEntity();
        groupEntity.setGName((String)groupInfo.get("group_name"));
        groupEntity.setGEx((String) groupInfo.get("group_ex"));
        groupEntity.setGState((boolean)groupInfo.get("group_state"));

        groupService.groupUpdate(groupEntity,id);
        return "success";
    }

    //그룹 자세히보기 - 그룹 정보와, 그룹의 맴버 정보 전달
    @ResponseBody
    @GetMapping("show/{id}")
    public Map<String, Object> ShowGroup(@PathVariable("id") long groupId)
    {
        GroupEntity groupValue = groupService.findGroupId(groupId);
        Map<String, Object> value = new HashMap<>();
        List<GroupMemberEntity> members = groupMemberService.readGroupUser(groupValue);

        List groupMemberInfoList = new ArrayList();
        for(GroupMemberEntity groupMember : members)
        {
            Map<String, Object> groupMemberInfoMap = new HashMap<>();
            UserEntity user =  userInfoService.findUser(groupMember.getUserCodeFK().getUserCd());
            groupMemberInfoMap.put("userId", user.getUserId());
            groupMemberInfoMap.put("userNm", user.getUserNm());
            groupMemberInfoMap.put("userEx", user.getUserEx());
            groupMemberInfoList.add( groupMemberInfoMap);
        }
        value.put("groupNm",groupValue.getGName());
        value.put("groupEx",groupValue.getGEx());
        value.put("groupPic",groupValue.getGPic());
        value.put("groupMember",groupMemberInfoList);
        return value;
    }

    @ResponseBody
    @GetMapping("readAll")
    public Map<String, Object> readAllGroup()
    {
        List<GroupEntity> group =  groupService.findAllPublicGroup();
        Map<String, Object> resultMap = new HashMap<>();
        List resultList = new ArrayList();
      //  System.out.println(group);
        if(group != null)
        {
            for(GroupEntity temp : group)
            {
                Map<String, Object> tempResultMap = new HashMap<>();
                tempResultMap.put("groupNm",temp.getGName());
                tempResultMap.put("groupEx",temp.getGEx());
                resultList.add(tempResultMap);
            }
            resultMap.put("group",resultList);

        }else {
            resultMap.put(".",null);
            return resultMap;
        }

        return resultMap;
    }

}
