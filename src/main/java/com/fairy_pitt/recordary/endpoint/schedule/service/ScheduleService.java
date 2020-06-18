package com.fairy_pitt.recordary.endpoint.schedule.service;

import com.fairy_pitt.recordary.common.domain.*;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.common.repository.ScheduleRepository;
import com.fairy_pitt.recordary.common.repository.ScheduleTabRepository;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.schedule.dto.*;
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
public class ScheduleService implements Comparator< ScheduleResponseDto > {

    private final ScheduleRepository scheduleRepository;
    private final ScheduleTabRepository scheduleTabRepository;
    private final GroupService groupService;
    private final UserService userService;
    private final PostRepository postRepository;

    @Transactional
    public Long save(ScheduleSaveRequestDto requestDto)
    {
        ScheduleTabEntity scheduleTabEntity = scheduleTabRepository.findByTabCd(requestDto.getTabCd());
        UserEntity user = userService.findEntity(requestDto.getUserCd());
        GroupEntity group = groupService.findEntity(requestDto.getGroupCd());
        return scheduleRepository.save(requestDto.toEntity(scheduleTabEntity,user,group))
                .getScheduleCd();
    }

    @Transactional
    public Long update(Long id, ScheduleUpdateRequestDto updateRequestDto) {
        ScheduleEntity scheduleEntity = scheduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 스케줄이 없습니다. id=" + id));

        ScheduleTabEntity scheduleTabEntity = scheduleTabRepository.findByTabCd(updateRequestDto.getTabCodeFK());
        scheduleEntity.updateSchedule(scheduleTabEntity,
                updateRequestDto.getScheduleNm(),
                updateRequestDto.getScheduleEx(),
                updateRequestDto.getScheduleStr(),
                updateRequestDto.getScheduleEnd(),
                updateRequestDto.getScheduleCol(),
                updateRequestDto.getSchedulePublicState() );

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
    public  List<ScheduleResponseDto> showUserSchedule(ScheduleDateRequestDto responseDto, Long targetUserCd, int state )
    {
        UserEntity targetUser = userService.findEntity(targetUserCd);
        List<ScheduleResponseDto> schedule;

        if(responseDto.getTabCd() == null) {
          schedule = scheduleRepository.findByUserFkAndGroupFKIsNullAndSchedulePublicStateLessThanEqualAndScheduleStrBetween(targetUser,
                    state,
                    responseDto.getFromDate(),
                    responseDto.getToDate())
                    .stream()
                    .map(ScheduleResponseDto::new)
                    .collect(Collectors.toList());
        }else {
            ScheduleTabEntity tab = scheduleTabRepository.findByTabCd(responseDto.getTabCd());
            schedule = scheduleRepository.findByUserFkAndGroupFKIsNullAndTabFKAndSchedulePublicStateLessThanEqualAndScheduleStrBetween(targetUser,
                    tab,
                    state,
                    responseDto.getFromDate(),
                    responseDto.getToDate())
                    .stream()
                    .map(ScheduleResponseDto::new)
                    .collect(Collectors.toList());
        }

        return schedule;
    }

    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> findIasMemberScheduleList(Long targetUserCd,List<ScheduleResponseDto> responseDto, ScheduleDateRequestDto date){

        UserEntity targetUser = userService.findEntity(targetUserCd);
        Long currUserCd = userService.currentUserCd();
        //Long currUserCd = Long.parseLong("2");

        List<ScheduleResponseDto> schedule = scheduleRepository.findByUserFkAndGroupFKIsNullAndSchedulePublicStateAndScheduleStrBetween(targetUser,
                3,
                date.getFromDate(),
                date.getToDate())
                .stream()
                .map(ScheduleResponseDto::new)
                .collect(Collectors.toList());

            for(ScheduleResponseDto scheduleTemp : schedule){
                List<ScheduleMemberResponseDto> scheduleMembers = scheduleTemp.getScheduleMemberList();
                for(ScheduleMemberResponseDto MemberTemp : scheduleMembers ){
                    if(MemberTemp.getUserCd().equals(currUserCd)){
                        responseDto.add(scheduleTemp);
                    }
                }
            }

        return scheduleSort(responseDto);
    }

    @Transactional(readOnly =  true)
    public  List<ScheduleResponseDto> searchSchedule(Long userCd, int state, String name)
    {
        UserEntity user = userService.findEntity(userCd);
        return  scheduleRepository.findByUserFkAndGroupFKIsNullAndScheduleNmLikeAndSchedulePublicStateLessThanEqual(user, "%"+name+"%", state).stream()
                .map(ScheduleResponseDto :: new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> searchIasMemberScheduleList(Long targetUserCd,List<ScheduleResponseDto> responseDto, String name)
    {
        UserEntity user = userService.findEntity(targetUserCd);
        List<ScheduleResponseDto> schedule = scheduleRepository.findByUserFkAndGroupFKIsNullAndScheduleNmLikeAndSchedulePublicStateOrderByScheduleStr(user, name, 3).stream()
         .map(ScheduleResponseDto :: new)
          .collect(Collectors.toList());

        for(ScheduleResponseDto scheduleTemp : schedule) {
            List<ScheduleMemberResponseDto> scheduleMembers = scheduleTemp.getScheduleMemberList();
            for (ScheduleMemberResponseDto MemberTemp : scheduleMembers) {
                if (MemberTemp.getUserCd().equals(targetUserCd)) {
                    responseDto.add(scheduleTemp);
                }
            }
        }
        return scheduleSort(responseDto);
    }

    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> searchGroupScheduleList(Long groupCd, String name, Boolean isMember)
    {
        GroupEntity group = groupService.findEntity(groupCd);
        if(isMember){
            return scheduleRepository.findByGroupFKAndScheduleNmLike(group, name)
                    .stream()
                    .map(ScheduleResponseDto::new)
                    .collect(Collectors.toList());
        } else {
            return scheduleRepository.findByGroupFKAndSchedulePublicStateAndScheduleNmLike(group, 0, name)
                    .stream()
                    .map(ScheduleResponseDto::new)
                    .collect(Collectors.toList());
        }

    }

    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> findPostSchedule(Long userCd, Date strDate, int stat, Date endDate)
    {
        UserEntity user = userService.findEntity(userCd);
        return scheduleRepository.findByUserFkAndGroupFKIsNullAndSchedulePublicStateAndScheduleStrBetween(user, stat, strDate,endDate).stream()
                .map(ScheduleResponseDto :: new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ScheduleResponseDto> findGroupSchedule(Long groupCd, ScheduleDateRequestDto requestDto){
        GroupEntity group = groupService.findEntity(groupCd);
        List<ScheduleResponseDto> scheduleResponseDtoList = scheduleRepository.findByGroupFKAndScheduleStrBetween(group,requestDto.getFromDate(),requestDto.getToDate()).stream()
                .map(ScheduleResponseDto :: new)
                .collect(Collectors.toList());

        return  scheduleSort(scheduleResponseDtoList);
    }


    @Transactional(readOnly = true)
    public List<ScheduleMemberResponseDto> getScheduleMember(Long id) {
        return scheduleRepository.findByScheduleCd(id).getScheduleMembers()
                .stream()
                .map(ScheduleMemberResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ScheduleEntity findEntity(Long ScheduleCd){

        return scheduleRepository.findByScheduleCd(ScheduleCd);
    }

    public List<ScheduleResponseDto> scheduleSort(List<ScheduleResponseDto> responseDto)
    {
        Comparator<ScheduleResponseDto> reverse = Comparator.comparing(ScheduleResponseDto::getScheduleEnd).reversed();
        responseDto.sort(Comparator.comparing(ScheduleResponseDto::getScheduleStr).thenComparing(reverse));
        return  responseDto;
    }

    @Override
    public int compare(ScheduleResponseDto o1, ScheduleResponseDto o2) {
        return 0;
    }
}
