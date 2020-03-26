package com.fairy_pitt.recordary.endpoint.Schedule;

import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.endpoint.Schedule.Service.ScheduleTabService;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleTabRequestDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.JsonPath;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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

/*
    //생성
    @GetMapping("create")
    public String insertTab(@RequestParam Map<String, Object> tabInfo)
    {
//        UserEntity currUser = userService.find((long)tabInfo.get("tab_cd"));
        ScheduleTabEntity scheduleTabEntity = new ScheduleTabEntity();
        scheduleTabEntity.setTabNm((String) tabInfo.get("tab_nm"));
        scheduleTabEntity.setTabCol((String) tabInfo.get("tab_col"));
//        scheduleTabEntity.setTabUserFk(currUser);

        if(scheduleTabService.insertTab(scheduleTabEntity))
        {
            return "seccess";
        }
            return "fail";
    }

    //수정
    @GetMapping("update")
    public String updateTab(@RequestParam Map<String, Object> tabInfo)
    {

        if(scheduleTabService.updateTab(tabInfo))
        {
            return "seccess";
        }
        return "fail";
    }

    //삭제
    @GetMapping("delete")
    public String deleteTab(@RequestParam long tabId)
    {
        scheduleTabService.deleteTab(tabId);
        return "seccess";
    }

//    // read 어떤식으로??
//    @GetMapping("read")
//    public Map<String, Object> readTab(long id) // 요청을 어떤식으로??
//    {
//        //UserEntity currentUser = (UserEntity)session.getAttribute("loginUser");
//        Map<String , Object> resultMap = new HashMap<>();
//        List<ScheduleTabEntity> resultList = scheduleTabService.readTab(id);
//        return resultMap;
//    }
*/

}
