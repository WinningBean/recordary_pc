package com.fairy_pitt.recordary.endpoint.Schedule;

import com.fairy_pitt.recordary.endpoint.Schedule.Service.ScheduleService;
import com.fairy_pitt.recordary.endpoint.Schedule.Service.ScheduleTabService;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RequestMapping("schedule")
@RestController
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final ScheduleTabService scheduleTabService;

    @PostMapping("create")
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
    public Boolean deleteGroup(@PathVariable Long id){
        scheduleService.delete(id);
        return true;
    }

    @PostMapping("showUserSchedule")
    public List<ScheduleResponseDto> showUserSchedule(@RequestBody ScheduleRequestDto responseDto){
        return scheduleService.showUserSchedule(responseDto);
    }

//    @GetMapping("showMySchedule")
//    public List<ScheduleResponseDto> showMySchedule()
//    {
//
//    }
//

    //스케줄을 가져오는건 user에서 .getschedules

/*//    @PostMapping("create")
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
//    }*/

}
