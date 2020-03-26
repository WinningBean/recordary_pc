package com.fairy_pitt.recordary.endpoint.Schedule.Service;

import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.ScheduleTabRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleTabRequestDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor // final 객체 주입
public class ScheduleTabService {

    private final ScheduleTabRepository scheduleTabRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long save(ScheduleTabRequestDto requestDto) {
        UserEntity user = userRepository.findByUserId(requestDto.getUserFk());
        return scheduleTabRepository.save(requestDto.toEntity(user))
                .getTabCd();
    }

    @Transactional
    public void delete(Long id) {
        ScheduleTabEntity scheduleTabEntity = scheduleTabRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다. id=" + id));

        scheduleTabRepository.delete(scheduleTabEntity);
    }

    @Transactional
    public void update()
    {

    }


    //private final
/*    public Boolean insertTab(ScheduleTabEntity scheduleTabEntity)
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

//    }*/

}
