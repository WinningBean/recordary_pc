package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import com.fairy_pitt.recordary.endpoint.group.service.GroupApplyService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class GroupApplyController {

    @Autowired
    private final UserService userService;
    private final GroupService groupService;
    private final GroupApplyService groupApplyService;
    private  final GroupMemberService groupMemberService;

    @ResponseBody
    @GetMapping("apply")// 초대 ,신청
    public String apply(@RequestParam Map<String, Object> applyInfo)
    {
        GroupApplyEntity groupApplyEntity = new GroupApplyEntity();
        groupApplyEntity.setUserCodeFK(userService.find((Long)applyInfo.get("userCd")));
        groupApplyEntity.setGroupCodeFK(groupService.findGroupId((Long)applyInfo.get("groupCd")));
        groupApplyEntity.setApplyState((int)applyInfo.get("groupSate"));

        groupApplyService.applyInsert(groupApplyEntity);
        return "success";
    }

    @ResponseBody // 수락, 거절
    @GetMapping("apply/check")
    public String check(@RequestParam Map<String, Object> checkInfo)
    {

        // 알단 확인하면 지우고
        // 수락이면 insert 거절이면 대로
        GroupMemberPK groupApplyID = new GroupMemberPK();
        groupApplyID.setUserCodeFK((Long)checkInfo.get("userCd"));
        groupApplyID.setGroupCodeFK((Long)checkInfo.get("groupCd"));
        groupApplyService.applyDelete(groupApplyID);

        if((Boolean)checkInfo.get("result") == true)
        {
            GroupMemberEntity groupMemberEntity = new GroupMemberEntity();

            groupMemberEntity.setGroupCodeFK(groupService.findGroupId((Long)checkInfo.get("userCd")));
            groupMemberEntity.setUserCodeFK(userService.find((Long)checkInfo.get("groupCd")));
            Boolean result = groupMemberService.insertMember(groupMemberEntity);
            if(result)
            {
                return "success";
            }else
            {
                return "fail";
            }
        }
        return "success";
    }

    // 그룹이 유저한테 초대보낸 것을 찾기
    @ResponseBody
    @GetMapping("apply/find")
    public Map<String, Object> findApply(@RequestParam Map<String, Object> userInfo)
    {
        Map<String, Object> applyFindResult = new HashMap<>();
        UserEntity userEntity = userService.find((long)userInfo.get("userCd"));
        List<GroupApplyEntity> apply = groupApplyService.findGroupAppliesToUser(userEntity);
        List applyGroupInfoLIst = new ArrayList<>();

        for(GroupApplyEntity temp : apply)
        {
            Map<String, Object> groupInfoMap = new HashMap<>();
            GroupEntity groupEntity = groupService.findGroupId(temp.getGroupCodeFK().getGroupCd());
            groupInfoMap.put("groupNN",groupEntity.getGName());
            groupInfoMap.put("groupEx",groupEntity.getGEx());
            groupInfoMap.put("groupPic",groupEntity.getGPic());
            applyGroupInfoLIst.add(groupInfoMap);
        }
        applyFindResult.put("group",applyGroupInfoLIst );

        return applyFindResult;
    }

    //유저가 그룹한테 신청보넨 정보 찾기
    @ResponseBody
    @GetMapping
    public Map<String, Object> findGroupApply(@RequestParam Map<String, Object> groupInfo)
    {
        Map<String, Object> applyFindResult = new HashMap<>();
        GroupEntity groupEntity  = groupService.findGroupId((long)groupInfo.get("groupCd"));
        List<GroupApplyEntity> apply = groupApplyService.findUserAppliesToGroup(groupEntity);

        List applyUserInfoLIst = new ArrayList<>();
        for(GroupApplyEntity temp : apply)
        {
            Map<String, Object> userInfoMap = new HashMap<>();
            UserEntity userEntity = userService.find(temp.getUserCodeFK().getUserCd());
            userInfoMap.put("userNM",userEntity.getUserNm());
            userInfoMap.put("userEx",userEntity.getUserEx());
            userInfoMap.put("userId",userEntity.getUserId());
            applyUserInfoLIst.add(userInfoMap);
        }
        applyFindResult.put("user",applyUserInfoLIst );

        return applyFindResult;
    }
}
