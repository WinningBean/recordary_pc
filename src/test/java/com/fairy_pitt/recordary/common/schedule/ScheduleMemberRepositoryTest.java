package com.fairy_pitt.recordary.common.schedule;

import com.fairy_pitt.recordary.common.domain.*;
import com.fairy_pitt.recordary.common.repository.ScheduleMemberRepository;
import com.fairy_pitt.recordary.common.repository.ScheduleRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ScheduleMemberRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private ScheduleMemberRepository scheduleMemberRepository;

    @After
    public void cleanUp()
    {
        scheduleMemberRepository.deleteAll();
        scheduleRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void scheduleMember_생성()
    {
        UserEntity saveUser = userRepository.save(UserEntity.builder()
                .userId("test")
                .userPw("test")
                .userNm("테스트 유저")
                .build());


        Date scheduleStr = Timestamp.valueOf("2020-03-25 12:13:24");
        Date scheduleEnd = Timestamp.valueOf("2020-03-26 12:13:24");

       ScheduleEntity scheduleEntity = scheduleRepository.save(ScheduleEntity.builder()
                .userFK(saveUser)
                .tabFK(null)
                .scheduleCol(null)
                .scheduleNm("테스트")
                .schedulePublicState(3)
                .scheduleEx("테스트")
                .scheduleStr(scheduleStr)
                .scheduleEnd(scheduleEnd)
                .build());

       scheduleMemberRepository.save(ScheduleMemberEntity.builder()
                 .scheduleFK(scheduleEntity)
                 .userFK(saveUser)
                 .scheduleState(true)
                 .build());

        //when
        List<ScheduleMemberEntity> scheduleMemberEntities = scheduleMemberRepository.findAll();

        //than
        ScheduleMemberEntity scheduleMemberEntity = scheduleMemberEntities.get(0);
        Assertions.assertThat(scheduleMemberEntity.getUserFK().getUserCd()).isEqualTo(saveUser.getUserCd());
        Assertions.assertThat(scheduleMemberEntity.getScheduleFK().getScheduleCd()).isEqualTo(scheduleEntity.getScheduleCd());
    }
}
