package com.fairy_pitt.recordary.common.post;

import com.fairy_pitt.recordary.common.entity.*;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.common.repository.PostScheduleShareRepository;
import com.fairy_pitt.recordary.common.repository.ScheduleRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PostScheduleShareRepositoryTest {
    @Autowired
    PostScheduleShareRepository postScheduleShareRepository;
    @Autowired
    PostRepository postRepository;
    @Autowired
    ScheduleRepository scheduleRepository;
    @Autowired
    UserRepository userRepository;

    @After
    public void cleanup(){
        postScheduleShareRepository.deleteAll();
        scheduleRepository.deleteAll();
        postRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void 일정공유게시물_불러오기(){
        //given
        UserEntity user1 = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        PostEntity postEntity = postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글")
                .postPublicState(1)
                .postScheduleShareState(false)
                .build());

        ScheduleEntity scheduleEntity = scheduleRepository.save(ScheduleEntity.builder()
                .userFK(user1)
                .tabFK(null)
                .scheduleCol(null)
                .scheduleNm("테스트 일정")
                .schedulePublicState(1)
                .scheduleStr(Timestamp.valueOf("2020-06-15 12:13:24"))
                .scheduleEnd(Timestamp.valueOf("2020-06-15 12:13:24"))
                .build());

        postScheduleShareRepository.save(PostScheduleShareEntity.builder()
                .postFK(postEntity)
                .scheduleFK(scheduleEntity)
                .build());

        //when
        List<PostScheduleShareEntity> postScheduleShareEntityList = postScheduleShareRepository.findAll();

        //then
        PostScheduleShareEntity postScheduleShareEntity = postScheduleShareEntityList.get(0);
        assertThat(postScheduleShareEntity.getPostFK().getPostCd()).isEqualTo(postEntity.getPostCd());
        assertThat(postScheduleShareEntity.getScheduleFK().getScheduleCd()).isEqualTo(scheduleEntity.getScheduleCd());
    }

    @Test
    public void BaseTimeEntity_등록() {
        //given
        LocalDateTime now = LocalDateTime.of(2020, 6, 15, 0, 0, 0);

        UserEntity user1 = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        PostEntity postEntity = postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글")
                .postPublicState(1)
                .postScheduleShareState(false)
                .build());

        ScheduleEntity scheduleEntity = scheduleRepository.save(ScheduleEntity.builder()
                .userFK(user1)
                .tabFK(null)
                .scheduleCol(null)
                .scheduleNm("테스트 일정")
                .schedulePublicState(1)
                .scheduleStr(Timestamp.valueOf("2020-06-15 12:13:24"))
                .scheduleEnd(Timestamp.valueOf("2020-06-15 12:13:24"))
                .build());

        postScheduleShareRepository.save(PostScheduleShareEntity.builder()
                .postFK(postEntity)
                .scheduleFK(scheduleEntity)
                .build());

        //when
        List<PostScheduleShareEntity> postScheduleShareEntityList = postScheduleShareRepository.findAll();

        //then
        PostScheduleShareEntity postScheduleShareEntity = postScheduleShareEntityList.get(0);

        System.out.println(">>>>>>>>> createDate=" + postScheduleShareEntity.getCreatedDate() + ", modifiedDate=" + postScheduleShareEntity.getModifiedDate());

        assertThat(postScheduleShareEntity.getCreatedDate()).isAfter(now);
        assertThat(postScheduleShareEntity.getModifiedDate()).isAfter(now);
    }
}
