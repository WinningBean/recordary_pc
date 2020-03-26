package com.fairy_pitt.recordary.common.post;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.PostLikeEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.PostLikeRepository;
import com.fairy_pitt.recordary.common.repository.PostRepository;
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
public class PostLikeRepositoryTest {

    @Autowired
    PostLikeRepository postLikeRepository;
    @Autowired
    PostRepository postRepository;
    @Autowired
    UserRepository userRepository;

    @After
    public void cleanup(){
        postLikeRepository.deleteAll();
        postRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void 게시글좋아요_불러오기(){
        //given
        UserEntity user1 = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        UserEntity user2 = userRepository.save(UserEntity.builder()
                .userId("testUser2")
                .userPw("testPassword")
                .userNm("테스트 유저2")
                .build());

        PostEntity postEntity = postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());

        postLikeRepository.save(PostLikeEntity.builder()
                .postFK(postEntity)
                .userFK(user2)
                .build());

        //when
        List<PostLikeEntity> postLikeEntityList = postLikeRepository.findAll();

        //then
        PostLikeEntity postLikeEntity = postLikeEntityList.get(0);
        assertThat(postLikeEntity.getPostFK().getPostEx()).isEqualTo(postEntity.getPostEx());
        assertThat(postLikeEntity.getUserFK().getUserId()).isEqualTo(user2.getUserId());
    }

    @Test
    public void BaseTimeEntity_등록() {
        //given
        LocalDateTime now = LocalDateTime.of(2020, 3, 11, 0, 0, 0);

        UserEntity user1 = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        UserEntity user2 = userRepository.save(UserEntity.builder()
                .userId("testUser2")
                .userPw("testPassword")
                .userNm("테스트 유저2")
                .build());

        PostEntity postEntity = postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());

        postLikeRepository.save(PostLikeEntity.builder()
                .postFK(postEntity)
                .userFK(user2)
                .build());
        //when
        List<PostLikeEntity> postLikeEntityList = postLikeRepository.findAll();

        //then
        PostLikeEntity postLikeEntity = postLikeEntityList.get(0);

        System.out.println(">>>>>>>>> createDate=" + postLikeEntity.getCreatedDate() + ", modifiedDate=" + postLikeEntity.getModifiedDate());

        assertThat(postLikeEntity.getCreatedDate()).isAfter(now);
        assertThat(postLikeEntity.getModifiedDate()).isAfter(now);
    }
}
