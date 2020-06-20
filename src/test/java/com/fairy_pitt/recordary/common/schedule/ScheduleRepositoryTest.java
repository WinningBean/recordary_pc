package com.fairy_pitt.recordary.common.schedule;

import com.fairy_pitt.recordary.common.domain.PostEntity;
import com.fairy_pitt.recordary.common.domain.ScheduleEntity;
import com.fairy_pitt.recordary.common.domain.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.repository.ScheduleRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ScheduleRepositoryTest {

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    UserRepository userRepository;

    @After
    public void cleanUp(){
        scheduleRepository.deleteAll();
        userRepository.deleteAll();
    }

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
        Date scheduleStr = Timestamp.valueOf("2020-03-25 12:13:24");
        Date scheduleEnd = Timestamp.valueOf("2020-03-26 12:13:24");
        String scheduleCo = null;

        scheduleRepository.save(ScheduleEntity.builder()
                .userFK(saveUser)
                .tabFK(null)
                .scheduleCol(null)
                .scheduleNm(scheduleNm)
                .schedulePublicState(3)
                .scheduleEx(scheduleEx)
                .scheduleStr(scheduleStr)
                .scheduleEnd(scheduleEnd)
                .build());
    }

}
