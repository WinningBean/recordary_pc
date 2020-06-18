package com.fairy_pitt.recordary.endpoint.toDo;


import com.fairy_pitt.recordary.common.domain.ToDoEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.repository.ToDoRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.toDo.dto.TodoRequestDto;
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
public class toDoControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ToDoRepository toDoRepository;

    @After
    public void tearDown()
    {
        toDoRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void TODO_등록() throws  Exception {
        //given
        UserEntity user = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        Date End = Timestamp.valueOf("2020-03-26 12:13:24");

        TodoRequestDto requestDto =  TodoRequestDto.builder()
                .toDoCol(null)
                .toDoContent("test")
                .toDoEndDate(End)
                .userCd(user.getUserCd())
                .toDoSate(false)
                .build();

        String url = "http://localhost:" + port + "/toDo/";

        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        List<ToDoEntity> all = toDoRepository.findAll();
        assertThat(all.get(0).getUserFK().getUserCd()).isEqualTo(user.getUserCd());
    }
}
