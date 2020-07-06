package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.endpoint.group.dto.GroupApplyRequestDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupApplyResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupMemberDto;
import com.fairy_pitt.recordary.endpoint.group.service.GroupApplyService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("groupApply")
@RestController
public class GroupApplyController {

    private final  GroupApplyService groupApplyService;
    private final UserService userService;

    @PostMapping("create")
    public Boolean applyCreate(@RequestBody GroupApplyRequestDto requestDto)
    {
        userService.checkSessionLogout();
        return groupApplyService.save(requestDto);
    }

    @PostMapping("delete")
    public Boolean applyDelete(@RequestBody GroupMemberDto id){
        userService.checkSessionLogout();
        groupApplyService.delete(id);
        return true;
    }

    // @GetMapping("findGroupApply/{userCd}")
    // public List<GroupApplyResponseDto> findGroupAppliesToUser(@PathVariable Long userCd){
    //     userService.checkSessionLogout();
    //     return groupApplyService.findGroupAppliesToUser(userCd);
    // }

    @GetMapping("findUserApply/{groupCd}")
    public List<GroupApplyResponseDto> findUserAppliesToGroup(@PathVariable Long groupCd)
    {
        userService.checkSessionLogout();
        return groupApplyService.findUserAppliesToGroup(groupCd);
    }
}
