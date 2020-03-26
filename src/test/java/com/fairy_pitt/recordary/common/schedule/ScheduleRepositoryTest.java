package com.fairy_pitt.recordary.common.schedule;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.ScheduleRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ScheduleRepositoryTest {

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    UserRepository userRepository;

    @After
    public void cleanUp(){scheduleRepository.deleteAll();}

    @Test
    public void 스케줄_저장(){

        //given
        //given
        UserEntity saveUser = userRepository.save(UserEntity.builder()
                .userId("test")
                .userPw("test")
                .userNm("테스트 유저")
                .build());

        ScheduleTabEntity TabCodeFK = null;
        PostEntity PostFK = null;
        String scheduleNm = "Test";
        String scheduleEx = "Testing";
        Date scheduleStr;
        Date scheduleEnd;
        String scheduleCo = null;
    }

}
