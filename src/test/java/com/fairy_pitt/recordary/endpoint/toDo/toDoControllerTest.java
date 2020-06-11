package com.fairy_pitt.recordary.endpoint.toDo;


import com.fairy_pitt.recordary.common.entity.ToDoEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
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

        TodoRequestDto requestDto =  TodoRequestDto.builder()
                .toDoCol(null)
                .toDoContent("test")
                .toDoEndDate(null)
                .userCd(user.getUserCd())
                .build();

        String url = "http://localhost:" + port + "/toDo/";

        ResponseEntity<Boolean> responseEntity = restTemplate.postForEntity(url, requestDto, Boolean.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isEqualTo(true);

        List<ToDoEntity> all = toDoRepository.findAll();
        assertThat(all.get(0).getUserFK().getUserCd()).isEqualTo(user.getUserCd());
    }
}
