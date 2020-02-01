package com.fairy_pitt.recordary.group.controller;

import com.fairy_pitt.recordary.group.domain.entity.GroupEntity;
import com.fairy_pitt.recordary.group.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("group")
public class GroupController {

    @Autowired
    private GroupService groupService ;

    @ResponseBody
    @PostMapping("create")
    public Map<String,Boolean> CreateGroup(@RequestParam Map<String, String> groupImpo)
    {
        GroupEntity groupEntity = new GroupEntity();
        groupEntity.setGName(groupImpo.get("group_name"));
        groupEntity.setGEx(groupImpo.get("group_ex"));

        Map<String,Boolean> result = new HashMap<>();
        result.put("isCreate",groupService.groupCreate(groupEntity));

        return result;
    }
}
