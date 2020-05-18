package com.fairy_pitt.recordary.endpoint.schedule;

import com.fairy_pitt.recordary.common.pk.ScheduleMemberEntityPK;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleMemberService;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleService;
import com.fairy_pitt.recordary.endpoint.schedule.dto.ScheduleMemberSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.schedule.dto.ScheduleMemberUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RequestMapping("scheduleMember")
@RestController
public class ScheduleMemberController {

    private final ScheduleService scheduleService;
    private final ScheduleMemberService scheduleMemberService;

    @PostMapping("/")
    public Boolean save(@RequestBody ScheduleMemberSaveRequestDto requestDto){

        scheduleMemberService.save(requestDto);
        return true;
    }

    @PostMapping("update")
    public  Boolean update(@RequestBody ScheduleMemberEntityPK id,
                           @RequestBody ScheduleMemberUpdateRequestDto requestDto){

        scheduleMemberService.update(id,requestDto);
        return true;
    }

    @PostMapping("delete")
    public Boolean delete(@RequestBody ScheduleMemberEntityPK id){
        scheduleMemberService.delete(id);
        return true;
    }

}
