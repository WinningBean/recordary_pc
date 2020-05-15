package com.fairy_pitt.recordary.endpoint.Schedule;

import com.fairy_pitt.recordary.common.pk.ScheduleMemberEntityPK;
import com.fairy_pitt.recordary.endpoint.Schedule.Service.ScheduleMemberService;
import com.fairy_pitt.recordary.endpoint.Schedule.Service.ScheduleService;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleMemberSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleMemberUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RequestMapping("scheduleMember")
@Controller
public class ScheduleMemberController {

    private final ScheduleService scheduleService;
    private final ScheduleMemberService scheduleMemberService;

    @PutMapping("/")
    public  Boolean save(@RequestBody ScheduleMemberSaveRequestDto requestDto){

        scheduleMemberService.save(requestDto);
        return true;
    }

    @PutMapping("update")
    public  Boolean update(@RequestBody ScheduleMemberEntityPK id,
                           @RequestBody ScheduleMemberUpdateRequestDto requestDto){
        scheduleMemberService.update(id,requestDto);
        return true;
    }

    @DeleteMapping("delete")
    public Boolean delete(@RequestBody ScheduleMemberEntityPK id){
        scheduleMemberService.delete(id);
        return true;
    }



    /*    @GetMapping("insert")
    public Map<String, Boolean> addMember(@RequestParam Map<String, Object> tabInfo)
    {
        Map<String, Boolean> result = new HashMap<>();
//        scheduleMemberService.scheduleMemberInsert(Long.parseLong(tabInfo.get("user")),Long.parseLong(tabInfo.get("schedule")));
        return result;
    }

    @PostMapping("delete")
    public Map<String, Boolean> deleteMember()
    {
        Map<String, Boolean> result = new HashMap<>();
        return result;
    }

    @GetMapping("read")
    public Map<String, Boolean> findMember()
    {
        Map<String, Boolean> result = new HashMap<>();
        return result;
    }*/

}
