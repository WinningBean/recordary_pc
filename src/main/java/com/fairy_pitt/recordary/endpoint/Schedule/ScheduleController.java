package com.fairy_pitt.recordary.endpoint.Schedule;

import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.endpoint.Schedule.Service.ScheduleService;
import com.fairy_pitt.recordary.endpoint.Schedule.Service.ScheduleTabService;
import com.fairy_pitt.recordary.endpoint.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("schedule")
public class ScheduleController {


    @Autowired
    private final ScheduleService scheduleService;
    private final PostService postService ;
    private final ScheduleTabService scheduleTabService;

//    @PostMapping("create")
//    public Map<String, Boolean> createSchedule(@RequestParam Map<String, Object> scheduleInfo)
//    {
//        PostEntity postEntity =  postService.find(scheduleInfo.get("Post_Cd"));
//        ScheduleTabEntity scheduleTabEntity = scheduleTabService.findById(scheduleInfo.get("Tab_Cd"));
//        Map<String , Boolean> result = new HashMap<>();
//        result.put("isCreate",  scheduleService.createSchedule(scheduleInfo, postEntity, scheduleTabEntity));
//        return result;
//    }

    @PostMapping("delete/{id}")
    public Map<String, Boolean> deleteSchedule(@PathVariable("id") long scheduleId)
    {
        Map<String , Boolean> result = new HashMap<>();
        result.put("isDelete", scheduleService.deleteSchedule(scheduleId));
        return result;
    }

    @PostMapping("search")
    public List<ScheduleEntity> findSchedule(Date fromDate, Date toDate)
    {
        return scheduleService.findScheduleByDate(fromDate , toDate);
    }

    @PostMapping("update/{id}")
    public Map<String, Boolean> updateSchedule(@PathVariable("id") long scheduleId, ScheduleEntity scheduleEntity)
    {
        Map<String , Boolean> result = new HashMap<>();
        result.put("isUpdate", scheduleService.updateSchedule(scheduleId ,scheduleEntity));
        return result;
    }

//    @PostMapping("show/{id}") --> 이것도 Post에서 가져와야함
//    public Map<String, Object> showSchedule(@PathVariable("id") long postId)
//    {
//
//    }

}
