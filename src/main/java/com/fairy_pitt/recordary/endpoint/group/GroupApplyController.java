package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.endpoint.group.dto.GroupApplyRequestDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupApplyResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupMemberRequestDto;
import com.fairy_pitt.recordary.endpoint.group.service.GroupApplyService;
import com.fairy_pitt.recordary.endpoint.notice.dto.NoticePageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public List<NoticePageDto> findGroupAppliesToUser(@PathVariable Long userCd){

        return groupApplyService.findGroupAppliesToUser(userCd);
    }

    @GetMapping("findUserApply/{groupCd}")
    public List<GroupApplyResponseDto> findUserAppliesToGroup(@PathVariable Long groupCd)
    {
        return groupApplyService.findUserAppliesToGroup(groupCd);
    }
}
