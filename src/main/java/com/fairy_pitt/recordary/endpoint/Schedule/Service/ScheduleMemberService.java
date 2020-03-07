package com.fairy_pitt.recordary.endpoint.Schedule.Service;

import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.pk.ScheduleMemberEntityPK;
import com.fairy_pitt.recordary.common.repository.ScheduleMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ScheduleMemberService {


    private final ScheduleMemberRepository scheduleMemberRepository;

    public Boolean scheduleMemberInsert(UserEntity user, ScheduleEntity schedule)
    {
        ScheduleMemberEntity scheduleMemberEntity = new ScheduleMemberEntity();
        scheduleMemberEntity.setScheduleCodeFK(schedule);
        scheduleMemberEntity.setUserCodeFK(user);
        scheduleMemberEntity.setScheduleState(false);

        scheduleMemberRepository.save(scheduleMemberEntity);
        return  true;
    }

    public Boolean scheduleMemberDelete(long userCode, long scheduleCode)
    {
        ScheduleMemberEntityPK scheduleMemberEntityPK = new ScheduleMemberEntityPK();
        scheduleMemberEntityPK.setScheduleCodeFK(scheduleCode);
        scheduleMemberEntityPK.setUserCodeFK(userCode);
        scheduleMemberRepository.deleteById(scheduleMemberEntityPK);
        return  true;
    }


}
