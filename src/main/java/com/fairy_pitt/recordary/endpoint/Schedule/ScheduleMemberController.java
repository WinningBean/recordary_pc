package com.fairy_pitt.recordary.endpoint.Schedule;

import com.fairy_pitt.recordary.endpoint.Schedule.Service.ScheduleMemberService;
import com.fairy_pitt.recordary.endpoint.Schedule.Service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("scheduleMember")
@Controller
public class ScheduleMemberController {

    private final ScheduleService scheduleService;
    private final ScheduleMemberService scheduleMemberService;
    @GetMapping("insert")
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
    }

}
