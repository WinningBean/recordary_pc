package com.fairy_pitt.recordary.common.toDo;

import com.fairy_pitt.recordary.common.entity.ToDoEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.ToDoRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
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
public class toDoRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ToDoRepository toDoRepository;


    @After
    public void cleanUp()
    {
        toDoRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void toDo_생성()
    {
        UserEntity saveUser = userRepository.save(UserEntity.builder()
                .userId("test2")
                .userPw("test")
                .userNm("테스트 유저")
                .build());

        toDoRepository.save(ToDoEntity.builder()
                .user(saveUser)
                .toDoContent("test")
                .toDoCol(null)
                .toDoEndDate(null)
                .build());

        List<ToDoEntity> toDoEntities = toDoRepository.findAll();
        ToDoEntity toDoEntity = toDoEntities.get(0);
        Assertions.assertThat(toDoEntity.getUserFK().getUserCd()).isEqualTo(saveUser.getUserCd());
    }
}
