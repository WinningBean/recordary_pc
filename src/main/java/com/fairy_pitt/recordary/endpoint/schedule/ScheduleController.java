package com.fairy_pitt.recordary.endpoint.schedule;

import com.fairy_pitt.recordary.endpoint.follower.service.FollowerService;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleService;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleTabService;
import com.fairy_pitt.recordary.endpoint.schedule.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RequestMapping("schedule")
@RestController
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final FollowerService followerService;
    private final ScheduleTabService scheduleTabService;

    @PostMapping("/")
    public Long groupCreate(@RequestBody ScheduleSaveRequestDto requestDto)
    {
        return scheduleService.save(requestDto);
    }

    @PostMapping("update/{id}")
    public Long update(@PathVariable Long id,
                       @RequestBody ScheduleUpdateRequestDto requestDto) {
        return scheduleService.update(id, requestDto);
    }

    @DeleteMapping("{id}")
    public Boolean deleteSchedule(@PathVariable Long id){
        scheduleService.delete(id);
        return true;
    }

    @PostMapping("showUserSchedule/{id}")
    public List<ScheduleResponseDto> showUserSchedule(@PathVariable Long id, @RequestBody ScheduleDateRequestDto responseDto){
        return scheduleService.showUserSchedule(responseDto, id, followerService.checkUserState(id));
    }
}
