package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.endpoint.group.service.GroupApplyService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.user.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class GroupApplyController {

    @Autowired
    private final UserInfoService userInfoService;
    private final GroupService groupService;
    private final GroupApplyService groupApplyService;

    @GetMapping("apply")
    public String apply(@RequestParam Map<String, Object> applyInfo)
    {
        GroupApplyEntity groupApplyEntity = new GroupApplyEntity();
        groupApplyEntity.setUserCodeFK(userInfoService.findUser((Long)applyInfo.get("userCd")));
        groupApplyEntity.setGroupCodeFK(groupService.findGroupId((Long)applyInfo.get("groupCd")));
        groupApplyEntity.setApplyState((int)applyInfo.get("groupSate"));

        groupApplyService.applyInsert(groupApplyEntity);
        return "success";
    }

    @GetMapping
    public String check(@RequestParam Map<String, Object> checkInfo)
    {

     // 알단 확인하면 지우고
        // 수락이면 insert 거절이면 대로



        return "success";
    }

    // 그룹이 유저한테 초대보낸 것을 찾기
    @GetMapping("apply/find")
    public Map<String, Object> findApply(@RequestParam Map<String, Object> userInfo)
    {
        Map<String, Object> applyFindResult = new HashMap<>();
        UserEntity userEntity = userInfoService.findUser((long)userInfo.get("userCd"));
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
}
