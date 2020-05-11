package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.pk.GroupMemberPK;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupApplyRequestDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupApplyResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupMemberRequestDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
import com.fairy_pitt.recordary.endpoint.group.service.GroupApplyService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@RequestMapping("groupApply")
@RestController
public class GroupApplyController {

    private final  GroupApplyService groupApplyService;

    @PostMapping("create")
    public Boolean applyCreate(@RequestBody GroupApplyRequestDto requestDto)
    {
        return groupApplyService.save(requestDto);
    }

    @PostMapping("delete")
    public Boolean applyDelete(@RequestBody GroupMemberRequestDto id){
        groupApplyService.delete(id);
        return true;
    }

    @GetMapping("findGroupApply/{userCd}")
    public List<GroupApplyResponseDto> findGroupAppliesToUser(@PathVariable Long userCd){

        return groupApplyService.findGroupAppliesToUser(userCd);
    }

    @GetMapping("findUserApply/{groupCd}")
    public List<GroupApplyResponseDto> findUserAppliesToGroup(@PathVariable Long groupCd)
    {
        return groupApplyService.findUserAppliesToGroup(groupCd);
    }
}
