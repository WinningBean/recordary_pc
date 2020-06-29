package com.fairy_pitt.recordary.endpoint.schedule;

import com.fairy_pitt.recordary.common.pk.ScheduleMemberEntityPK;
import com.fairy_pitt.recordary.endpoint.schedule.dto.ScheduleMemberSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleMemberService;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RequestMapping("scheduleMember")
@RestController
public class ScheduleMemberController {

    private final ScheduleService scheduleService;
    private final ScheduleMemberService scheduleMemberService;
    private final UserService userService;

    @PostMapping("/{id}")
    public Boolean save(@RequestBody List<Long> requestDto, @PathVariable Long id){
        userService.checkSessionLogout();
        scheduleMemberService.save(requestDto, id);
        return true;
    }

    @PostMapping("update")
    public  Boolean update(@RequestBody ScheduleMemberSaveRequestDto requestDto){

        scheduleMemberService.update(requestDto);
        return true;
    }
    
    @PostMapping("delete")
    public Boolean delete(@RequestBody ScheduleMemberSaveRequestDto requestDto){
        scheduleMemberService.delete(requestDto);
        return true;
    }

}
