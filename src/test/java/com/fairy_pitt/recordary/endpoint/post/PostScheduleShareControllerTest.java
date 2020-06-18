package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.common.domain.*;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.common.repository.PostScheduleShareRepository;
import com.fairy_pitt.recordary.common.repository.ScheduleRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.post.dto.PostSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostScheduleShareSaveRequestDto;
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
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PostScheduleShareControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private PostScheduleShareRepository postScheduleShareRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private UserRepository userRepository;

    @After
    public void tearDown() throws Exception{
        postScheduleShareRepository.deleteAll();
        scheduleRepository.deleteAll();
        postRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void PostLike_등록된다() throws Exception{
        //given
        UserEntity user1 = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        ScheduleEntity schedule1 = scheduleRepository.save(ScheduleEntity.builder()
                .userFK(user1)
                .tabFK(null)
                .scheduleCol(null)
                .scheduleNm("테스트 일정1")
                .schedulePublicState(1)
                .scheduleStr(Timestamp.valueOf("2020-06-15 12:13:24"))
                .scheduleEnd(Timestamp.valueOf("2020-06-15 12:13:24"))
                .build());

        ScheduleEntity schedule2 = scheduleRepository.save(ScheduleEntity.builder()
                .userFK(user1)
                .tabFK(null)
                .scheduleCol(null)
                .scheduleNm("테스트 일정2")
                .schedulePublicState(1)
                .scheduleStr(Timestamp.valueOf("2020-06-15 12:13:24"))
                .scheduleEnd(Timestamp.valueOf("2020-06-15 12:13:24"))
                .build());

        PostSaveRequestDto postFK = PostSaveRequestDto.builder()
                .userCd(user1.getUserCd())
                .groupCd(null)
                .postOriginCd(null)
                .scheduleCd(null)
                .mediaCd(null)
                .postEx("테스트")
                .postPublicState(0)
                .postScheduleShareState(false)
                .build();

        List<Long> scheduleCdList = new ArrayList<>();
        scheduleCdList.add(schedule1.getScheduleCd());
        scheduleCdList.add(schedule2.getScheduleCd());

        PostScheduleShareSaveRequestDto requestDto = PostScheduleShareSaveRequestDto.builder()
                .postFK(postFK)
                .scheduleCdList(scheduleCdList)
                .build();

        String url = "http://localhost:" + port + "/post/scheduleShare";

        //when
        ResponseEntity<Integer> responseEntity = restTemplate.postForEntity(url, requestDto, int.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isEqualTo(2);

        List<PostScheduleShareEntity> all = postScheduleShareRepository.findAll();
        assertThat(all.get(0).getPostFK().getPostCd()).isNotEqualTo(null);
        assertThat(all.get(0).getScheduleFK().getScheduleCd()).isEqualTo(schedule1.getScheduleCd());
    }
}
