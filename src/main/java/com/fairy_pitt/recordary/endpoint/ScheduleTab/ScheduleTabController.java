package com.fairy_pitt.recordary.endpoint.ScheduleTab;

import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.endpoint.ScheduleTab.Service.ScheduleTabService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("tab")
@RequiredArgsConstructor
public class ScheduleTabController {

    @Autowired
    private final ScheduleTabService scheduleTabService;
    private final HttpSession session;
    private final UserService userService;

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

}
