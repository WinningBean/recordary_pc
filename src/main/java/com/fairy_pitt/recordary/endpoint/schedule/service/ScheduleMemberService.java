package com.fairy_pitt.recordary.endpoint.schedule.service;

import com.fairy_pitt.recordary.common.domain.ScheduleEntity;
import com.fairy_pitt.recordary.common.domain.ScheduleMemberEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
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
    private final ScheduleService scheduleService;
    private final UserService userService;

    @Transactional
    public void delete(List<Long> userCd, Long ScheduleCd) {
        ScheduleEntity schedule = scheduleService.findEntity(ScheduleCd);

        for (Long temp : userCd) {
            UserEntity user = userService.findEntity(temp);
            ScheduleMemberEntity scheduleMemberEntity = scheduleMemberRepository.findByUserFKAndScheduleFK(user, schedule);
            scheduleMemberRepository.delete(scheduleMemberEntity);
        }
    }

    @Transactional
    public Boolean save(List<Long> userCd, Long ScheduleCd) {
        ScheduleEntity schedule = scheduleService.findEntity(ScheduleCd);
        for (Long temp : userCd) {
            UserEntity user = userService.findEntity(temp);
            ScheduleMemberSaveRequestDto requestDto = new ScheduleMemberSaveRequestDto();
            scheduleMemberRepository.save(requestDto.toEntity(schedule, user));
        }
        return true;
    }

    @Transactional
    public Boolean update(ScheduleMemberEntityPK id, Boolean scheduleState) {
        ScheduleMemberEntity scheduleMemberEntity = scheduleMemberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        scheduleMemberEntity.scheduleMemberUpdate(scheduleState);
        return true;
    }

    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> findUserAsMemberScheduleList(Long targetUserCd, List<ScheduleResponseDto> responseDto, ScheduleDateRequestDto date) {
        Long currUserCd = userService.currentUserCd();
        if(currUserCd == null){return scheduleService.scheduleSort(responseDto);};
        if (date.getTabCd() == null) {
            UserEntity targetUser = userService.findEntity(targetUserCd);
            List<ScheduleResponseDto> schedule = scheduleMemberRepository.findByUserFKAndAndScheduleState(targetUser, true)
                    .stream()
                    .map(ScheduleResponseDto::new)
                    .collect(Collectors.toList());

            if (!currUserCd.equals(targetUserCd)) {
                for (ScheduleResponseDto temp : schedule) {
                    int str = date.getFromDate().compareTo(temp.getScheduleStr());
                    int end = date.getToDate().compareTo(temp.getScheduleStr());
                    if (((str == 0 || str < 0) && temp.getSchedulePublicState() == 0) && ((end == 0 || end > 0) && temp.getSchedulePublicState() == 0)) {
                        responseDto.add(temp);
                    }
                }
                return scheduleService.findIasMemberScheduleList(targetUserCd, responseDto, date);
            } else {
                for (ScheduleResponseDto temp : schedule) {
                    int str = date.getFromDate().compareTo(temp.getScheduleStr());
                    int end = date.getToDate().compareTo(temp.getScheduleStr());
                    if ((str == 0 || str < 0) && (end == 0 || end > 0)) {
                        responseDto.add(temp);
                    }
                }
            }
        }

        return scheduleService.scheduleSort(responseDto);
    }

    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> searchUserAsMemberScheduleList(Long targetUserCd, List<ScheduleResponseDto> responseDto, String name) {

        UserEntity targetUser = userService.findEntity(targetUserCd);
        Long currUserCd = userService.currentUserCd();
//        Long currUserCd = Long.parseLong("2");

        List<ScheduleResponseDto> schedule = scheduleMemberRepository.findByUserFKAndAndScheduleState(targetUser, true)
                .stream()
                .filter(scheduleMemberEntity -> scheduleMemberEntity.getScheduleFK().getScheduleNm().contains(name))
                .map(ScheduleResponseDto::new)
                .collect(Collectors.toList());

        if (!currUserCd.equals(targetUserCd)) {
            for (ScheduleResponseDto temp : schedule) {
                if (temp.getSchedulePublicState() == 0) {
                    responseDto.add(temp);
                }
            }
            return scheduleService.searchIasMemberScheduleList(targetUserCd, responseDto, name);
        } else {
            for (ScheduleResponseDto temp : schedule) {
                {
                    responseDto.add(temp);
                }
            }
        }

        return scheduleService.scheduleSort(responseDto);
    }
}




