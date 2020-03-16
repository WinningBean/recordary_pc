package com.fairy_pitt.recordary.endpoint.Schedule.Service;

import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.repository.ScheduleTabRepository;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor // final 객체 주입
public class ScheduleTabService {

    @Autowired
    private final ScheduleTabRepository scheduleTabRepository;
    private final UserService userService;

    public Boolean insertTab(ScheduleTabEntity scheduleTabEntity)
    {
        Optional<ScheduleTabEntity> tab = Optional.of(scheduleTabRepository.save(scheduleTabEntity));
        if (tab.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    public Boolean deleteTab(long id)
    {
        scheduleTabRepository.deleteById(id);
        return true;
    }

    public Boolean updateTab(Map<String,Object> updateTap)
    {
        Optional<ScheduleTabEntity> currTabCheck = scheduleTabRepository.findById((long)updateTap.get("tab_id"));
        ScheduleTabEntity currTab = currTabCheck.get();

        currTab.setTabCol((String)updateTap.get("tab_col"));
        currTab.setTabNm((String)updateTap.get("tab_nm"));

        scheduleTabRepository.save(currTab);

        return true;
    }

//    public List<ScheduleTabEntity> readTab(long id)
//    {
//        return userService.find(id)
//                .getUserTab();
//    }

//    public ScheduleTabEntity findById(Long id)
//    {
//        return scheduleTabRepository.findBytabCd(id);
    // dk gkrl tlfgdj dhsmfdms wlsWk dkanrjteh gkrltlfgek. bbb rmsep dhorPthr chlwndms chlwndms chlwndms
    //chwlndsn chlwndns chlwnds
    //chlwndms chlwndms chlwndms chlwndms !
//    }

}
