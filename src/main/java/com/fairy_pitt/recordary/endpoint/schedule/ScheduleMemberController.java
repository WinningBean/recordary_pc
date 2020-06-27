package com.fairy_pitt.recordary.endpoint.schedule;

import com.fairy_pitt.recordary.common.pk.ScheduleMemberEntityPK;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleMemberService;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleService;
import com.fairy_pitt.recordary.endpoint.schedule.dto.ScheduleMemberSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RequestMapping("scheduleMember")
@RestController
public class ScheduleMemberController {

    private final ScheduleService scheduleService;
    private final ScheduleMemberService scheduleMemberService;

    @PostMapping("/{id}")
    public Boolean save(@RequestBody List<Long> requestDto, @PathVariable Long id){

        scheduleMemberService.save(requestDto, id);
        return true;
    }

    @PostMapping("update")
    public  Boolean update(@RequestBody ScheduleMemberEntityPK id,
                           @RequestBody Boolean scheduleState){

        scheduleMemberService.update(id,scheduleState);
        return true;
    }


//    @PostMapping("delete")
//    public Boolean delete(@RequestBody ScheduleMemberEntityPK id){
//        scheduleMemberService.delete(id);
//        return true;
//    }

}
