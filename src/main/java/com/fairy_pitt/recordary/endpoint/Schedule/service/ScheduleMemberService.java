package com.fairy_pitt.recordary.endpoint.Schedule.service;

import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.pk.ScheduleMemberEntityPK;
import com.fairy_pitt.recordary.common.repository.ScheduleMemberRepository;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleMemberSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleMemberUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ScheduleMemberService {


    private final ScheduleMemberRepository scheduleMemberRepository;
    private final ScheduleService scheduleService ;
    private final UserService userService;

    @Transactional
    public void delete(ScheduleMemberEntityPK id) {
        ScheduleMemberEntity scheduleMemberEntity = scheduleMemberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));
        scheduleMemberRepository.delete(scheduleMemberEntity);
    }

    @Transactional
    public Boolean save(ScheduleMemberSaveRequestDto requestDto)
    {
        UserEntity user = userService.findEntity(requestDto.getUserCd());
        ScheduleEntity schedule = scheduleService.findEntity(requestDto.getScheduleCd());
        scheduleMemberRepository.save(requestDto.toEntity(schedule, user));
        return true;
    }

    @Transactional
    public Boolean update(ScheduleMemberEntityPK id, ScheduleMemberUpdateRequestDto requestDto)
    {
        ScheduleMemberEntity scheduleMemberEntity = scheduleMemberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        scheduleMemberEntity.scheduleMemberUpdate(requestDto.getScheduleState());
        return true;
    }


/*    public Boolean scheduleMemberInsert(UserEntity user, ScheduleEntity schedule)
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
    }*/


}
