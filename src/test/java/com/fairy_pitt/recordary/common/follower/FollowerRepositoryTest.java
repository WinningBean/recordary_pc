package com.fairy_pitt.recordary.common.follower;

import com.fairy_pitt.recordary.common.domain.FollowerEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.repository.FollowerRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
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
public class FollowerRepositoryTest {
    @Autowired
    FollowerRepository followerRepository;
    @Autowired
    UserRepository userRepository;

    @After
    public void cleanup(){
        followerRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void 팔로워저장_불러오기(){
        //given
        UserEntity userFK = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());
        UserEntity targetFK = userRepository.save(UserEntity.builder()
                .userId("testUser2")
                .userPw("testPassword")
                .userNm("테스트 유저2")
                .build());

        followerRepository.save(FollowerEntity.builder()
                .userFK(userFK)
                .targetFK(targetFK)
                .build());

        //when
        List<FollowerEntity> followerEntityList = followerRepository.findAll();

        //then
        FollowerEntity followerEntity = followerEntityList.get(0);
        assertThat(followerEntity.getUserFK().getUserCd()).isEqualTo(userFK.getUserCd());
        assertThat(followerEntity.getTargetFK().getUserCd()).isEqualTo(targetFK.getUserCd());
    }

    @Test
    public void BaseTime_등록(){
        //given
        LocalDateTime now = LocalDateTime.of(2020, 3, 11, 0, 0, 0);

        UserEntity userFK = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());
        UserEntity targetFK = userRepository.save(UserEntity.builder()
                .userId("testUser2")
                .userPw("testPassword")
                .userNm("테스트 유저2")
                .build());

        followerRepository.save(FollowerEntity.builder()
                .userFK(userFK)
                .targetFK(targetFK)
                .build());

        //when
        List<FollowerEntity> followerEntityList = followerRepository.findAll();

        //then
        FollowerEntity followerEntity = followerEntityList.get(0);

        System.out.println(">>>>>>>>> createDate=" + followerEntity.getCreatedDate() + ", modifiedDate=" + followerEntity.getModifiedDate());

        assertThat(followerEntity.getCreatedDate()).isAfter(now);
        assertThat(followerEntity.getModifiedDate()).isAfter(now);
    }
}
