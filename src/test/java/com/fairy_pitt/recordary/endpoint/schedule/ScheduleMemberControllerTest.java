package com.fairy_pitt.recordary.endpoint.schedule;

import com.fairy_pitt.recordary.common.entity.*;
import com.fairy_pitt.recordary.common.repository.*;
import com.fairy_pitt.recordary.endpoint.schedule.dto.ScheduleMemberSaveRequestDto;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ScheduleMemberControllerTest {


    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    UserRepository userRepository;

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


        String scheduleNm = "Test";
        String scheduleEx = "Testing";
        Date scheduleStr = Timestamp.valueOf("2020-03-25 12:13:24");
        Date scheduleEnd = Timestamp.valueOf("2020-03-26 12:13:24");
        String scheduleCo = null;

       ScheduleEntity scheduleEntity = scheduleRepository.save(ScheduleEntity.builder()
                .userFK(saveUser)
                .tabFK(null)
                .scheduleCol(null)
                .scheduleNm(scheduleNm)
                .schedulePublicState(3)
                .scheduleEx(scheduleEx)
                .scheduleStr(scheduleStr)
                .scheduleEnd(scheduleEnd)
                .build());


        Long scheduleCd = scheduleEntity.getScheduleCd();
        Long userCd = saveUser.getUserCd();

        ScheduleMemberSaveRequestDto requestDto = new ScheduleMemberSaveRequestDto(scheduleCd, userCd,true);

        String url = "http://localhost:" + port + "/scheduleMember/" ;

        // HttpEntity<ScheduleUpdateRequestDto> requestDtoHttpEntity = new HttpEntity<>(requestDto);

        //when
        ResponseEntity<Boolean> responseEntity = restTemplate.postForEntity(url, requestDto, Boolean.class);
        assertThat(responseEntity.getBody()).isEqualTo(true);

        //when
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        List<ScheduleMemberEntity> scheduleMemberEntities = scheduleMemberRepository.findAll();

        //than
        ScheduleMemberEntity scheduleMemberEntity = scheduleMemberEntities.get(0);
        assertThat(scheduleMemberEntity.getScheduleFK().getScheduleCd()).isEqualTo(scheduleCd);
    }

}
