package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.endpoint.group.dto.GroupMemberRequestDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.group.service.GroupMemberService;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.main.S3UploadComponent;
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
    private final GroupMemberService groupMemberService;
    private final S3UploadComponent s3UploadComponent;
    private final UserService userService;

    @PostMapping("create")
    public Long groupCreate(@RequestBody GroupSaveRequestDto requestDto) {
        return groupMemberService.save(GroupMemberRequestDto.builder()
                .groupCd(groupService.save(requestDto))
                .userCd(requestDto.getUserCd())
                .build());
    }

    @PostMapping("update/{id}")
    public Long update(@PathVariable Long id,
                       @RequestBody GroupUpdateRequestDto requestDto) {
        return groupService.updateGroupInfo(id, requestDto);
    }

    @PostMapping("updateProfile/{groupCd}")
    public String updateProfile(@RequestParam("data") MultipartFile multipartFile, @PathVariable Long groupCd) throws IOException {
        String url = s3UploadComponent.profileUpload(multipartFile, "group", groupCd);
        groupService.updateGroupProfile(url, groupCd);
        return url;
    }

    @PostMapping("changeMaster/{groupCd}")
    public Long updateMaster(@PathVariable Long groupCd,
                             @RequestBody Long userCd) {
        return groupService.changGroupMaster(userCd, groupCd);
    }

    @DeleteMapping("{groupCd}")
    public Long deleteGroup(@PathVariable Long groupCd) {
        groupService.delete(groupCd);
        return groupCd;
    }

    @GetMapping("findGroup/{groupNm}")
    public List<GroupResponseDto> findAllGroup(@PathVariable String groupNm) {
        return groupService.findGroupByName(groupNm);
    }

    @GetMapping("{groupCd}")
    public GroupResponseDto readGroup(@PathVariable Long groupCd) {
        return groupService.groupPage(groupCd);
    }


    @GetMapping("readAll")
    public @ResponseBody
    List<GroupResponseDto> findAllGroup() {
        return groupService.findAllGroup();
    }


    @GetMapping("group/{userCd}")
    public List<GroupResponseDto> findUserGroup(@PathVariable Long userCd) {

        return groupService.findUserGroups(userCd);
    }

    @GetMapping("member/{groupCd}")
    public List<UserResponseDto> findGroupMember(@PathVariable Long groupCd)
    {
        return groupService.findGroupMembers(groupCd);
    }


}
