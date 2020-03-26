package com.fairy_pitt.recordary.endpoint.Schedule.Service;

import com.fairy_pitt.recordary.common.entity.*;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.common.repository.ScheduleRepository;
import com.fairy_pitt.recordary.common.repository.ScheduleTabRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleMemberResponseDto;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleResponseDto;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.*;

@Service
@RequestMapping("schedule")
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final ScheduleTabRepository scheduleTabRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Transactional
    public Long save(ScheduleSaveRequestDto requestDto)
    {
        ScheduleTabEntity scheduleTabEntity = scheduleTabRepository.findByTabCd(requestDto.getTabCd());
        PostEntity post = postRepository.findByPostCd(requestDto.getPostCd());
        UserEntity user = userRepository.findByUserId(requestDto.getUserId());
        return scheduleRepository.save(requestDto.toEntity(scheduleTabEntity,post,user))
                .getScheduleCd();
    }

    @Transactional
    public Long update(Long id, ScheduleUpdateRequestDto UpdateRequestDto) {
        ScheduleEntity scheduleEntity = scheduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 스케줄이 없습니다. id=" + id));

        ScheduleTabEntity scheduleTabEntity = scheduleTabRepository.findByTabCd(UpdateRequestDto.getTabCodeFK());
        scheduleEntity.updateSchedule(scheduleTabEntity,
                UpdateRequestDto.getScheduleNm(),
                UpdateRequestDto.getScheduleEx(),
                UpdateRequestDto.getScheduleStr(),
                UpdateRequestDto.getScheduleEnd(),
                UpdateRequestDto.getScheduleCol());

        return id;
    }

    @Transactional
    public void delete(Long id) {
        ScheduleEntity scheduleEntity = scheduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        scheduleRepository.delete(scheduleEntity);
    }

    @Transactional
    public List<ScheduleResponseDto> findScheduleByDate(Date fromData, Date ToData)
    {
        List<ScheduleEntity> entityList = scheduleRepository.findByScheduleStrBetween(fromData, ToData);
        List<ScheduleResponseDto> result = new ArrayList<>();
        for (ScheduleEntity temp: entityList) {
            ScheduleResponseDto scheduleResponseDto = new ScheduleResponseDto(temp);
            result.add(scheduleResponseDto);
        }
        return result;
    }

//    public List<ScheduleMemberResponseDto> getScheduleMember(Long id) {
//        return scheduleRepository.findById(id).get().getScheduleMembers();
//    }

/*
    public List<ScheduleEntity> findScheduleByDate(Date fromData, Date ToData)
    {
        return scheduleRepository.findByScheduleStrBetween(fromData, ToData);
    }

    public Boolean updateSchedule(long PostId, ScheduleEntity scheduleEntity)
    {
        ScheduleEntity schedule = scheduleRepository.findById(PostId).get();
        schedule.setScheduleStr(scheduleEntity.getScheduleStr());
        schedule.setTabCodeFK(scheduleEntity.getTabCodeFK());
        schedule.setScheduleEx(scheduleEntity.getScheduleEx());
        schedule.setScheduleNm(scheduleEntity.getScheduleNm());

        return true;
    }

    public List<ScheduleMemberEntity> getScheduleMember(long scheduleCode)
    {
        return scheduleRepository.findById(scheduleCode).get().getScheduleMembers();
    }*/
    public ScheduleEntity findEntity(Long ScheduleCd){
        return scheduleRepository.findByScheduleCd(ScheduleCd);
    }

}
