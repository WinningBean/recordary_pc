package com.fairy_pitt.recordary.common.schedule;


import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.ScheduleTabRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ScheduleTabRepositoryTest {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScheduleTabRepository scheduleTabRepository;

    @After
    public void cleanUp()
    {
        scheduleTabRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void scheduleTab_생성()
    {

        UserEntity saveUser = userRepository.save(UserEntity.builder()
                .userId("test2")
                .userPw("test")
                .userNm("테스트 유저")
                .build());

        scheduleTabRepository.save(ScheduleTabEntity.builder()
                .tabNm("test")
                .tabCol(null)
                .userFk(saveUser)
                .build());

        List<ScheduleTabEntity> scheduleTabEntities = scheduleTabRepository.findAll();

        //than
        ScheduleTabEntity scheduleTabEntity = scheduleTabEntities.get(0);
        Assertions.assertThat(scheduleTabEntity.getUserFk().getUserCd()).isEqualTo(saveUser.getUserCd());

    }
}
