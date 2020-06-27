package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.endpoint.group.dto.GroupPageResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupRequestDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.post.service.PostService;
import com.fairy_pitt.recordary.endpoint.schedule.dto.ScheduleDateRequestDto;
import com.fairy_pitt.recordary.endpoint.schedule.dto.ScheduleResponseDto;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleService;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@RequestMapping("group")
@RestController
public class GroupController {

    private final GroupService groupService;
    private final PostService postService;
    private  final ScheduleService scheduleService;
    private final GroupMemberService groupMemberService;
    private final UserService userService;

    @PostMapping("create")
    public Long groupCreate(@RequestBody GroupRequestDto requestDto) {
        userService.checkSessionLogout();
        return groupService.save(requestDto);
    }

    @PostMapping("update/{id}")
    public Long update(@PathVariable Long id,
                       @RequestBody GroupRequestDto requestDto) {
        userService.checkSessionLogout();
        return groupService.updateGroupInfo(id, requestDto);
    }

    @PostMapping("updateProfile/{groupCd}")
    public String updateProfile(@RequestParam("data") MultipartFile multipartFile, @PathVariable Long groupCd) throws IOException {
        userService.checkSessionLogout();
        return groupService.updateGroupProfile(groupCd, multipartFile);
    }

    @PostMapping("changeMaster/{groupCd}")
    public Long updateMaster(@PathVariable Long groupCd,
                             @RequestBody Long userCd) {
        userService.checkSessionLogout();
        return groupService.changGroupMaster(userCd, groupCd);
    }

    @DeleteMapping("{groupCd}")
    public Long deleteGroup(@PathVariable Long groupCd) {
        userService.checkSessionLogout();
        groupService.delete(groupCd);
        return groupCd;
    }

    @GetMapping("findGroup/{groupNm}")
    public List<GroupResponseDto> findByGroupName(@PathVariable String groupNm) {
        userService.checkSessionLogout();
        return groupService.findGroupByName(groupNm);
    }

    @GetMapping("/")
    public GroupPageResponseDto groupPage(@RequestParam(value = "input") Long groupCd) {
        userService.checkSessionLogout();
        return groupService.groupPage(groupCd);
    }

    @GetMapping("readAll")
    public @ResponseBody
    List<GroupResponseDto> findAllGroup() {
        userService.checkSessionLogout();
        return groupService.findAllGroup();
    }


    @GetMapping("group/{userCd}")
    public List<GroupResponseDto> findUserGroup(@PathVariable Long userCd) {
        userService.checkSessionLogout();
        return groupService.findUserGroups(userCd);
    }

    @GetMapping("member/{groupCd}")
    public List<UserResponseDto> findGroupMember(@PathVariable Long groupCd)
    {
        userService.checkSessionLogout();
        return groupService.findGroupMembers(groupCd);
    }

    @PostMapping("schedule/{groupCd}")
    public List<ScheduleResponseDto> groupSchedule(@PathVariable Long groupCd, ScheduleDateRequestDto date){
        userService.checkSessionLogout();
        return scheduleService.findGroupSchedule(groupCd, date);
    }


}
