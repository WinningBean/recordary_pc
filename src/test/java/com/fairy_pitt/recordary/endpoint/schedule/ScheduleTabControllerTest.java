package com.fairy_pitt.recordary.endpoint.schedule;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.ScheduleTabRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleTabRequestDto;
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

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ScheduleTabControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ScheduleTabRepository scheduleTabRepository;

    @Autowired
    private UserRepository userRepository;

    @After
    public void tearDown() throws Exception{
        scheduleTabRepository.deleteAll();
        userRepository.deleteAll();
    //  groupRepository.deleteAll();
    }
    @Test
    public void Tab_생성() throws Exception{

        //given
        UserEntity saveUser = userRepository.save(UserEntity.builder()
                .userId("test")
                .userPw("test")
                .userNm("테스트 유저")
                .build());

      String tabNm = "Test";

        ScheduleTabRequestDto requestDto = ScheduleTabRequestDto.createScheduleTabBuilder()
                .tabCol(null)
                .tabNm(tabNm)
                .userCd(saveUser.getUserCd())
                .build();

        String url = "http://localhost:" + port + "tab/create";
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<ScheduleTabEntity> all = scheduleTabRepository.findAll();
        assertThat(all.get(0).getTabNm()).isEqualTo(tabNm);


    }
}
