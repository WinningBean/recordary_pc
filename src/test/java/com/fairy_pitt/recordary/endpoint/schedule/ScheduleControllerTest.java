package com.fairy_pitt.recordary.endpoint.schedule;

import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.ScheduleRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleRequestDto;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleUpdateRequestDto;
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
public class ScheduleControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    UserRepository userRepository;

    @After
    public void tearDown(){
        scheduleRepository.deleteAll();
        userRepository.deleteAll();
    }


    @Test
    public void Schedule_등록된다() throws Exception {
        //given
        String scheduleEx = "테스트 게시글";
        String scheduleNm = "Test 게시글";
       // int postPublicState = 1;
        Date scheduleStr = Timestamp.valueOf("2020-03-25 12:13:24");
        Date scheduleEnd = Timestamp.valueOf("2020-03-26 12:13:24");

        ScheduleSaveRequestDto requestDto = ScheduleSaveRequestDto.createScheduleBuilder()
                .tabFK(null)
                .userFk(null)
                .scheduleNm(scheduleNm)
                .scheduleEx(scheduleEx)
                .scheduleStr(scheduleStr)
                .scheduleEnd(scheduleEnd)
                .scheduleCol(null)
                .build();

        String url = "http://localhost:" + port + "schedule/";

        //when
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<ScheduleEntity> all = scheduleRepository.findAll();
        assertThat(all.get(0).getScheduleEx()).isEqualTo(scheduleEx);
        assertThat(all.get(0).getScheduleNm()).isEqualTo(scheduleNm);
        assertThat(all.get(0).getScheduleStr()).isEqualTo(scheduleStr);
}

    @Test
    public void schedule_수정된다() throws Exception {
        //given
        UserEntity user = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        String scheduleEx = "테스트 게시글";
        // int postPublicState = 1;
        Date scheduleStr = Timestamp.valueOf("2020-03-25 12:13:24");
        Date scheduleEnd = Timestamp.valueOf("2020-03-26 12:13:24");

        ScheduleEntity saveSchedule = scheduleRepository.save(ScheduleEntity.builder()
                .tabFK(null)
                .userFK(user)
                .scheduleNm("Test")
                .scheduleEx(scheduleEx)
                .scheduleStr(scheduleStr)
                .scheduleEnd(scheduleEnd)
                .scheduleCol(null)
                .schedulePublicState(1)
                .build());

        Long scheduleCd = saveSchedule.getScheduleCd();

        String scheduleNmChange = "테스트 게시글2";
        String scheduleExChange = "테스트 게시글2";
        Date scheduleStr2 = Timestamp.valueOf("2020-04-25 12:13:24");
        Date scheduleEnd2 = Timestamp.valueOf("2020-04-26 12:13:24");

        ScheduleUpdateRequestDto requestDto = ScheduleUpdateRequestDto.updateScheduleBuilder()
                .TabCodeFK(null)
                .scheduleNm(scheduleNmChange)
                .scheduleEx(scheduleExChange)
                .scheduleStr(scheduleStr2)
                .scheduleEnd(scheduleEnd2)
                .scheduleCol(null)
                .build();

        String url = "http://localhost:" + port + "schedule/update/" + scheduleCd;

       // HttpEntity<ScheduleUpdateRequestDto> requestDtoHttpEntity = new HttpEntity<>(requestDto);

        //when
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url,requestDto, Long.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<ScheduleEntity> all = scheduleRepository.findAll();
        assertThat(all.get(0).getScheduleEx()).isEqualTo(scheduleExChange);
        assertThat(all.get(0).getScheduleNm()).isEqualTo(scheduleNmChange);
        assertThat(all.get(0).getScheduleStr()).isEqualTo(scheduleStr2);

    }

    @Test
    public void schedule_가져오기() throws Exception {

        //given
        UserEntity user = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        String scheduleEx = "테스트 게시글";
        Date scheduleStr = Timestamp.valueOf("2020-03-25 12:13:24");
        Date scheduleEnd = Timestamp.valueOf("2020-03-26 12:13:24");

        Date scheduleStr2 = Timestamp.valueOf("2020-04-25 12:13:24");
        Date scheduleEnd2 = Timestamp.valueOf("2020-04-26 12:13:24");

        ScheduleEntity saveSchedule = scheduleRepository.save(ScheduleEntity.builder()
                .tabFK(null)
                .userFK(user)
                .scheduleNm("Test")
                .scheduleEx(scheduleEx)
                .scheduleStr(scheduleStr)
                .scheduleEnd(scheduleEnd)
                .scheduleCol(null)
                .schedulePublicState(1)
                .build());

        ScheduleEntity saveSchedule2 = scheduleRepository.save(ScheduleEntity.builder()
                .tabFK(null)
                .userFK(user)
                .scheduleNm("Test")
                .scheduleEx(scheduleEx)
                .scheduleStr(scheduleStr)
                .scheduleEnd(scheduleEnd)
                .scheduleCol(null)
                .schedulePublicState(2)
                .build());

        ScheduleEntity saveSchedule3 = scheduleRepository.save(ScheduleEntity.builder()
                .tabFK(null)
                .userFK(user)
                .scheduleNm("Test")
                .scheduleEx(scheduleEx)
                .scheduleStr(scheduleStr)
                .scheduleEnd(scheduleEnd)
                .scheduleCol(null)
                .schedulePublicState(3)
                .build());

        ScheduleEntity saveSchedule4 = scheduleRepository.save(ScheduleEntity.builder()
                .tabFK(null)
                .userFK(user)
                .scheduleNm("Test")
                .scheduleEx(scheduleEx)
                .scheduleStr(scheduleStr)
                .scheduleEnd(scheduleEnd)
                .scheduleCol(null)
                .schedulePublicState(0)
                .build());

        ScheduleEntity saveSchedule5 = scheduleRepository.save(ScheduleEntity.builder()
                .tabFK(null)
                .userFK(user)
                .scheduleNm("Test")
                .scheduleEx(scheduleEx)
                .scheduleStr(scheduleStr2)
                .scheduleEnd(scheduleEnd2)
                .scheduleCol(null)
                .schedulePublicState(0)
                .build());

        ScheduleEntity saveSchedule6 = scheduleRepository.save(ScheduleEntity.builder()
                .tabFK(null)
                .userFK(user)
                .scheduleNm("Test")
                .scheduleEx(scheduleEx)
                .scheduleStr(scheduleStr2)
                .scheduleEnd(scheduleEnd2)
                .scheduleCol(null)
                .schedulePublicState(0)
                .build());

        Long userCd = user.getUserCd();
        Date fromDate = Timestamp.valueOf("2020-03-01 00:00:00");
        Date toDate = Timestamp.valueOf("2020-03-26 23:59:59");

        ScheduleRequestDto requestDto = new ScheduleRequestDto(userCd, 0,fromDate,toDate);

        String url = "http://localhost:" + port + "schedule/showUserSchedule" ;

        //when
        ResponseEntity<List> responseEntity = restTemplate.postForEntity(url,requestDto,List.class);

        assertThat(responseEntity.getBody().size()).isEqualTo(1);
    }



}
