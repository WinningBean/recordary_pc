package com.fairy_pitt.recordary.endpoint.Schedule.Service;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.repository.ScheduleRepository;
import com.fairy_pitt.recordary.common.repository.ScheduleTabRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

@Service
@RequestMapping("schedule")
@RequiredArgsConstructor
public class ScheduleService { // 포스터가 있어야 일정이 생길 수있음

    @Autowired
    private final ScheduleRepository scheduleRepository;


    public Boolean createSchedule (Map<String, Object> scheduleInfo, PostEntity postEntity, ScheduleTabEntity scheduleTabEntity)
    {
        ScheduleEntity scheduleEntity = new ScheduleEntity();
        scheduleEntity.setScheduleNm((String)scheduleInfo.get("schedule_nm"));
        scheduleEntity.setScheduleEx((String)scheduleInfo.get("schedule_ex"));
        scheduleEntity.setTabCodeFK(scheduleTabEntity);
        scheduleEntity.setScheduleStr((Date) scheduleInfo.get("schedule_str"));
        scheduleEntity.setScheduleStr((Date) scheduleInfo.get("schedule_end"));

        Optional<ScheduleEntity> resultEntity = Optional.of(scheduleRepository.save(scheduleEntity));
        if (resultEntity.isPresent()) return true;
        else return false;
    }

    public Boolean deleteSchedule(long scheduleId)
    {
        scheduleRepository.deleteById(scheduleId);
        return true;
    }

    public List<ScheduleEntity> findScheduleByDate(Date fromData, Date ToData)
    {
        return scheduleRepository.findByScheduleStrBetween(fromData, ToData);
    }

    @PostMapping("update")
    public Boolean updateSchedule(long PostId, ScheduleEntity scheduleEntity)
    {
        ScheduleEntity schedule = scheduleRepository.findById(PostId).get();
        schedule.setScheduleStr(scheduleEntity.getScheduleStr());
        schedule.setTabCodeFK(scheduleEntity.getTabCodeFK());
        schedule.setScheduleEx(scheduleEntity.getScheduleEx());
        schedule.setScheduleNm(scheduleEntity.getScheduleNm());

        return true;
    }

}
