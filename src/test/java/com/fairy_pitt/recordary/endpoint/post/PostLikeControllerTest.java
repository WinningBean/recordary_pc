package com.fairy_pitt.recordary.endpoint.post;

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
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PostLikeControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private PostLikeRepository postLikeRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    @After
    public void tearDown() throws Exception{
        postLikeRepository.deleteAll();
        postRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void PostLike_등록된다() throws Exception{ // session
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

        String url = "http://localhost:" + port + "/post/" + postEntity.getPostCd() + "/like";

//        //when
//        ResponseEntity<Boolean> responseEntity = restTemplate.getForEntity(url, Boolean.class);
//
//        //then
//        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
//        assertThat(responseEntity.getBody()).isEqualTo(true);
//
//        List<PostLikeEntity> all = postLikeRepository.findAll();
//        assertThat(all.get(0).getPostFK().getPostEx()).isEqualTo(postEntity.getPostEx());
//        assertThat(all.get(0).getUserFK().getUserId()).isEqualTo(user2.getUserId());
    }

    @Test
    public void PostLike_좋아요한사람() throws Exception{
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
        UserEntity user3 = userRepository.save(UserEntity.builder()
                .userId("testUser3")
                .userPw("testPassword")
                .userNm("테스트 유저3")
                .build());
        UserEntity user4 = userRepository.save(UserEntity.builder()
                .userId("testUser4")
                .userPw("testPassword")
                .userNm("테스트 유저4")
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
                .userFK(user1)
                .build());
        postLikeRepository.save(PostLikeEntity.builder()
                .postFK(postEntity)
                .userFK(user2)
                .build());
        postLikeRepository.save(PostLikeEntity.builder()
                .postFK(postEntity)
                .userFK(user3)
                .build());
        postLikeRepository.save(PostLikeEntity.builder()
                .postFK(postEntity)
                .userFK(user4)
                .build());

        String url = "http://localhost:" + port + "/post/" + postEntity.getPostCd() + "/likeUser";

        //when
        ResponseEntity<List> responseEntity = restTemplate.getForEntity(url, List.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().size()).isEqualTo(4);
    }

    @Test
    public void PostLike_좋아요한게시물() throws Exception{
        //given
        UserEntity user1 = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        PostEntity post1 = postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글1")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        PostEntity post2 = postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글2")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        PostEntity post3 = postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글3")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        PostEntity post4 = postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글4")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());

        postLikeRepository.save(PostLikeEntity.builder()
                .postFK(post1)
                .userFK(user1)
                .build());
        postLikeRepository.save(PostLikeEntity.builder()
                .postFK(post2)
                .userFK(user1)
                .build());
        postLikeRepository.save(PostLikeEntity.builder()
                .postFK(post3)
                .userFK(user1)
                .build());
        postLikeRepository.save(PostLikeEntity.builder()
                .postFK(post4)
                .userFK(user1)
                .build());

        String url = "http://localhost:" + port + "/post/like/" + user1.getUserId();

        //when
        ResponseEntity<List> responseEntity = restTemplate.getForEntity(url, List.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().size()).isEqualTo(4);
    }
}
