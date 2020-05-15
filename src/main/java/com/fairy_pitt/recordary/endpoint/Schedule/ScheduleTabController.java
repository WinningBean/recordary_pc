package com.fairy_pitt.recordary.endpoint.Schedule;

import com.fairy_pitt.recordary.endpoint.Schedule.service.ScheduleTabService;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleTabRequestDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;



@RequestMapping("tab")
@RequiredArgsConstructor
@RestController
public class ScheduleTabController {

    private final ScheduleTabService scheduleTabService;
    private final UserService userService;

    @PostMapping("create")
    public @ResponseBody Long save(@RequestBody ScheduleTabRequestDto requestDto){
        return scheduleTabService.save(requestDto);
    }

    @DeleteMapping("{id}")
    public Boolean delete(@PathVariable Long id){
        scheduleTabService.delete(id);
        return true;
    }

}
