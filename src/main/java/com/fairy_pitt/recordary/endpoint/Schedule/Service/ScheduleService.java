package com.fairy_pitt.recordary.endpoint.Schedule.Service;

import com.fairy_pitt.recordary.common.entity.*;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.common.repository.ScheduleRepository;
import com.fairy_pitt.recordary.common.repository.ScheduleTabRepository;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.*;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequestMapping("schedule")
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final ScheduleTabRepository scheduleTabRepository;
    private final UserService userService;
    private final PostRepository postRepository;

    @Transactional
    public Long save(ScheduleSaveRequestDto requestDto)
    {
        ScheduleTabEntity scheduleTabEntity = scheduleTabRepository.findByTabCd(requestDto.getTabCd());
        UserEntity user = userService.findEntity(requestDto.getUserCd());
        return scheduleRepository.save(requestDto.toEntity(scheduleTabEntity,user))
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

    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> findScheduleByDate(Date fromDate, Date ToDate)
    {
        List<ScheduleEntity> entityList = scheduleRepository.findByScheduleStrBetween(fromDate, ToDate);
        List<ScheduleResponseDto> result = new ArrayList<>();
        for (ScheduleEntity temp: entityList) {
            ScheduleResponseDto scheduleResponseDto = new ScheduleResponseDto(temp);
            result.add(scheduleResponseDto);
        }
        return result;
    }

    @Transactional(readOnly = true)
    public  List<ScheduleResponseDto> showUserSchedule(ScheduleRequestDto responseDto)
    {
        UserEntity user = userService.findEntity(responseDto.getUserCd());
        return scheduleRepository.findByUserFkAndSchedulePublicStateLessThanEqualAndScheduleStrBetween(user,
                responseDto.getState(),
                responseDto.getFrommDate(),
                responseDto.getToDate())
                .stream()
                .map(ScheduleResponseDto::new)
                .collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public List<ScheduleMemberResponseDto> getScheduleMember(Long id) {
        return scheduleRepository.findByScheduleCd(id).getScheduleMembers()
                .stream()
                .map(ScheduleMemberResponseDto::new)
                .collect(Collectors.toList());
    }


    public ScheduleEntity findEntity(Long ScheduleCd){
        return scheduleRepository.findByScheduleCd(ScheduleCd);
    }

}
