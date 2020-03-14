package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("groupMember")
public class GroupMemberController {

/*    @Autowired
    private GroupService groupService;
    @Autowired
    private GroupMemberService groupMemberService ;
    @Autowired
    private UserService userService;



    //    그룹 탈퇴
    @CrossOrigin
    @ResponseBody
    @PostMapping("delete")
    public Map<String, Boolean> leaveGroup(@RequestParam Map<String, String> memberDeleteInfo)
    {
        Map<String, Boolean> result = new HashMap<>();
        GroupMemberPK groupMemberPK = new GroupMemberPK();
        long memberCd = userService.findById(memberDeleteInfo.get("user_id")).getUserCd();
        groupMemberPK.setGroupCodeFK(Long.parseLong(memberDeleteInfo.get("group_cd")));
        groupMemberPK.setUserCodeFK(memberCd);

        *//*Optional<GroupMemberEntity> groupMemberEntity = groupMemberService.findMember(groupMemberPK);*//*
        result.put("isDelete",groupMemberService.deleteMember(groupMemberPK));
        return result;
    }

//    @ResponseBody
//    @GetMapping("joinGroup/{groupCd}/{memberCd}")
//    public String joinGroup(@PathVariable("groupCd") long groupCd, @PathVariable("memberCd") long memberCd){
//
//
//        GroupMemberEntity groupMemberEntity = new GroupMemberEntity();
//
//        groupMemberEntity.setGroupCodeFK(groupService.findGroupId(groupCd));
//        groupMemberEntity.setUserCodeFK(userInfoService.findUser(memberCd));
//
//       Boolean result = groupMemberService.insertMember(groupMemberEntity);
//       if(result)
//       {
//           return "success";
//       }else
//       {
//           return "fail";
//       }
//
//    }*/
}
