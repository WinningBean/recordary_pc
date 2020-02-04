package com.fairy_pitt.recordary.group.controller;

import com.fairy_pitt.recordary.group.domain.entity.GroupEntity;
import com.fairy_pitt.recordary.group.service.GroupService;
import com.fairy_pitt.recordary.group_member.domain.entity.MemberEntity;
import com.fairy_pitt.recordary.group_member.service.MemberService;
import com.fairy_pitt.recordary.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("group")
public class GroupController {

    @Autowired
    private HttpSession session;

    @Autowired
    private GroupService groupService ;

    @Autowired
    private MemberService memberService ;

    @ResponseBody
    @PostMapping("create") // 그룹 생성
    public Map<String,Boolean> CreateGroup(@RequestParam Map<String, String> groupInfo) {
        Users currUser = (Users) session.getAttribute("loginUser");

        GroupEntity groupEntity = new GroupEntity();
        MemberEntity memberEntity = new MemberEntity();

        groupEntity.setGName(groupInfo.get("group_name"));
        groupEntity.setGEx(groupInfo.get("group_ex"));
        groupEntity.setGMstUserFK(currUser);
        GroupEntity groupCreate = groupService.groupCreate(groupEntity);

        memberEntity.setUserCodeFK(currUser);
        memberEntity.setGroupCodeFK(groupCreate);
        boolean groupCreateComplete = memberService.insertMember(memberEntity);

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
            groupMap.put("group_name",groupEntity.getGName());
            groupMap.put("group_ex",groupEntity.getGEx());
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

}
