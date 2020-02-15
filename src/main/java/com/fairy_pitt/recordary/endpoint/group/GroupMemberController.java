package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

@Controller
public class GroupMemberController {
    @Autowired
    private GroupService groupService ;

    @Autowired
    private GroupMemberService groupMemberService ;
    @Autowired
    private UserService userService;



    //    그룹 탈퇴
    @ResponseBody
    @GetMapping("delete/{groupCd}/{memberCd}")
    public String leaveGroup(@PathVariable("groupCd") long groupCd, @PathVariable("memberCd") long memberCd)
    {
        GroupMemberPK groupMemberPK = new GroupMemberPK();
        groupMemberPK.setGroupCodeFK(groupCd);
        groupMemberPK.setUserCodeFK(memberCd);

        Optional<GroupMemberEntity> groupMemberEntity = groupMemberService.findMember(groupMemberPK);
        groupMemberService.deleteMember(groupMemberEntity.get());
        return "success";
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
//    }
}
