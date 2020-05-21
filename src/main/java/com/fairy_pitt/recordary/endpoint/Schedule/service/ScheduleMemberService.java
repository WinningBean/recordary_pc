package com.fairy_pitt.recordary.endpoint.schedule.service;

import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.pk.ScheduleMemberEntityPK;
import com.fairy_pitt.recordary.common.repository.ScheduleMemberRepository;
import com.fairy_pitt.recordary.endpoint.schedule.dto.*;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
    public Boolean save(List<Long> userCd, Long ScheduleCd)
    {
        ScheduleEntity schedule = scheduleService.findEntity(ScheduleCd);
        for(Long temp : userCd) {
            UserEntity user = userService.findEntity(temp);
            ScheduleMemberSaveRequestDto requestDto = new ScheduleMemberSaveRequestDto();
            scheduleMemberRepository.save(requestDto.toEntity(schedule, user));
        }
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

    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> findMemberScheduleList(Long userCd, List<ScheduleResponseDto> responseDto, ScheduleDateRequestDto date)
    {
        UserEntity user = userService.findEntity(userCd);
        Long currUserCd = userService.currentUserCd();

        List<ScheduleResponseDto> schedule =  scheduleMemberRepository.findByUserFKAndAndScheduleState(user, true)
                .stream()
                .map(ScheduleResponseDto::new)
                .collect(Collectors.toList());

        if(!currUserCd.equals(userCd)) {
            for (ScheduleResponseDto temp : schedule) {
                int str = date.getFromDate().compareTo(temp.getScheduleStr());
                int end = date.getToDate().compareTo(temp.getScheduleStr());
                if (((str == 0 || str < 0) && temp.getSchedulePublicState() == 0) && ((end == 0 || end > 0) && temp.getSchedulePublicState() == 0)) {
                    responseDto.add(temp);
                }
            }
        }else {
            for (ScheduleResponseDto temp : schedule) {
                int str = date.getFromDate().compareTo(temp.getScheduleStr());
                int end = date.getToDate().compareTo(temp.getScheduleStr());
                if ((str == 0 || str < 0) && (end == 0 || end > 0)) {
                    responseDto.add(temp);
                }
            }
        }
        return  responseDto;
    }

}
