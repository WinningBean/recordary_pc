package com.fairy_pitt.recordary.common.user;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.user.service.UserPasswordHashService;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserPasswordHashService userPasswordHashService;

    @After
    public void cleanup(){
        userRepository.deleteAll();
    }

    @Test
    public void 유저저장_불러오기(){
        //given
        String userId = "testUser";
        String userPw = "testPassword";
        String userNm = "테스트 유저";

        String hashedPassword = userPasswordHashService.getSHA256(userPw);

        userRepository.save(UserEntity.builder()
                .userId(userId)
                .userPw(hashedPassword)
                .userNm(userNm)
                .build());

        //when
        List<UserEntity> userEntityList = userRepository.findAll();

        //then
        UserEntity userEntity = userEntityList.get(0);
        assertThat(userEntity.getUserId()).isEqualTo(userId);
        assertThat(userEntity.getUserPw()).isEqualTo(hashedPassword);
        assertThat(userEntity.getUserNm()).isEqualTo(userNm);
    }

    @Test
    public void BaseTimeEntity_등록() {
        //given
        LocalDateTime now = LocalDateTime.of(2020, 3, 11, 0, 0, 0);
        userRepository.save(UserEntity.builder()
                .userId("testUser")
                .userPw("testPassword")
                .userNm("테스트 유저")
                .build());

        //when
        List<UserEntity> userEntityList = userRepository.findAll();

        //then
        UserEntity userEntity = userEntityList.get(0);

        System.out.println(">>>>>>>>> createDate=" + userEntity.getCreatedDate() + ", modifiedDate=" + userEntity.getModifiedDate());

        assertThat(userEntity.getCreatedDate()).isAfter(now);
        assertThat(userEntity.getModifiedDate()).isAfter(now);
    }
}
