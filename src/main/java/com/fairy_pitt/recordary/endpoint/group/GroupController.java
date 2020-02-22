package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
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
    private UserService userService;

    @Autowired private UserRepository userRepository;

    @ResponseBody
    @PostMapping("create") // 그룹 생성
    public Map<String,Boolean> CreateGroup(@RequestParam Map<String, Object> groupInfo) {
        //UserEntity currUser = (UserEntity) session.getAttribute("loginUser");

        GroupEntity groupEntity = new GroupEntity();
        GroupMemberEntity groupMemberEntity = new GroupMemberEntity();

        groupEntity.setGName((String)groupInfo.get("group_nm"));
        groupEntity.setGEx((String) groupInfo.get("group_ex"));

        groupEntity.setGMstUserFK((UserEntity) session.getAttribute("loginUser"));

        if((String) groupInfo.get("group_state") == "true")
        {
            groupEntity.setGState(true);
        }else {
            groupEntity.setGState(false);
        }
        GroupEntity groupCreate = groupService.groupCreate(groupEntity);
        groupMemberEntity.setUserCodeFK(groupCreate.getGMstUserFK());
        groupMemberEntity.setGroupCodeFK(groupCreate);

        boolean groupCreateComplete = groupMemberService.insertMember(groupCreate);
        Map<String, Boolean> result = new HashMap<>();
        result.put("isCreate", groupCreateComplete );

        return result;
    }

    @CrossOrigin
    @ResponseBody
    @GetMapping("search") // 그룹 검색
    public Map<String,Object> SearchGroup(@RequestParam(value = "groupSearch") String groupSearch)
    {
        Map<String, Object> groupMap = new HashMap<>();
        List<GroupEntity> searchResult = groupService.groupSearch(groupSearch);

        List GroupMapList = new ArrayList();
        for (GroupEntity groupEntity:searchResult) {
            if(groupEntity.getGState() == true)
            {
                Map<String,Object> groupMapTemp = new HashMap<>();
                groupMapTemp.put("group_nm",groupEntity.getGName());
                groupMapTemp.put("group_ex",groupEntity.getGEx());
                groupMapTemp.put("group_pic",groupEntity.getGPic());
                groupMapTemp.put("group_cd", groupEntity.getGroupCd());
                GroupMapList.add(groupMapTemp);
            }
            else{
                continue;
            }
        }
        groupMap.put("searchedGroup", GroupMapList);
        return groupMap;
    }

    @ResponseBody
    @PostMapping("delete/{id}")
    public Map<String,Boolean> DeleteGroup(@PathVariable("id") long id)
    {
        groupService.GroupDelete(id);
        Map<String,Boolean> result = new HashMap<>();
        result.put("isDelete", true);
        return result;
    }

    //그룹 정보수정
    @ResponseBody
    @PostMapping("update/{id}")
    public Map<String,Boolean> UpdateGroup(@PathVariable("id") long id, @RequestParam Map<String,Object> groupInfo)
    {
        GroupEntity groupEntity = new GroupEntity();
        groupEntity.setGName((String)groupInfo.get("group_nm"));
        groupEntity.setGEx((String) groupInfo.get("group_ex"));

        if((String) groupInfo.get("group_state") == "true")
        {
            groupEntity.setGState(true);
        }else {
            groupEntity.setGState(false);
        }
        Map<String,Boolean> result = new HashMap<>();
        result.put("isUdate", groupService.groupUpdate(groupEntity,id));

        return result;
    }

    //그룹 자세히보기 - 그룹 정보와, 그룹의 맴버 정보 전달
    @ResponseBody
    @PostMapping("show/{id}")
    public Map<String, Object> ShowGroup(@PathVariable("id") long groupId)
    {
        GroupEntity groupValue = groupService.findGroupId(groupId);
        Map<String, Object> value = new HashMap<>();
        List<GroupMemberEntity> members = groupMemberService.readGroupUser(groupValue);

        List groupMemberInfoList = new ArrayList();
        for(GroupMemberEntity groupMember : members)
        {
            Map<String, Object> groupMemberInfoMap = new HashMap<>();
            UserEntity user =  userService.find(groupMember.getUserCodeFK().getUserCd());
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
            resultMap.put("group",null);
            return resultMap;
        }

        return resultMap;
    }

}
