package com.fairy_pitt.recordary.endpoint.schedule;

import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.media.service.MediaService;
import com.fairy_pitt.recordary.endpoint.post.service.PostService;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleMemberService;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleService;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleTabService;
import com.fairy_pitt.recordary.endpoint.schedule.dto.*;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RequiredArgsConstructor
@RequestMapping("schedule")

@RestController
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final FollowerService followerService;
    private  final PostService postService;
    private final UserService userService;
    private final ScheduleMemberService scheduleMemberService;
    private final MediaService mediaService;

    @PostMapping("/")
    public Long scheduleCreate(@RequestBody ScheduleSaveRequestDto requestDto)
    {
        Long scheduleCd = scheduleService.save(requestDto);
        scheduleMemberService.save(requestDto.getScheduleMember(), scheduleCd);
        return  scheduleCd;
    }

    @PostMapping("update/{id}")
    public Long update(@PathVariable Long id,
                       @RequestBody ScheduleUpdateRequestDto requestDto) {
        if(requestDto.getCreateMember() != null)scheduleMemberService.save(requestDto.getCreateMember(), id);
        if(requestDto.getDeleteMember() != null)scheduleMemberService.save(requestDto.getDeleteMember(), id);
        return scheduleService.update(id, requestDto);
    }

    @DeleteMapping("{id}")
    public Boolean deleteSchedule(@PathVariable Long id){
        scheduleService.delete(id);
        return true;
    }

    @PostMapping("showUserSchedule/{id}")
    public List<ScheduleResponseDto> showUserSchedule(@PathVariable Long id, @RequestBody ScheduleDateRequestDto responseDto){
        List<ScheduleResponseDto> result = scheduleService.showUserSchedule(responseDto, id, followerService.checkPublicStateToTarget(userService.currentUserCd(), id));
        return scheduleMemberService.findUserAsMemberScheduleList(id, result, responseDto);
    }

    @PostMapping("showGroupSchedule/{id}")
    public List<ScheduleResponseDto> showGroupSchedule(@PathVariable Long id, @RequestBody ScheduleDateRequestDto responseDto){
       return scheduleService.findGroupSchedule(id, responseDto);
    }

    @GetMapping("search/{id}")
    public List<ScheduleResponseDto> searchUserSchedule(@PathVariable Long id, @RequestParam(value = "input") String name ){
//        Long currUserCd = Long.parseLong("2");
        List<ScheduleResponseDto> result = scheduleService.searchSchedule(id, followerService.checkPublicStateToTarget(userService.currentUserCd() /*currUserCd*/, id),name);
        return scheduleMemberService.searchUserAsMemberScheduleList(id, result, name);
    }
}
