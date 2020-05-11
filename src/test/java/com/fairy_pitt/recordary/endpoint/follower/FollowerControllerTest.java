package com.fairy_pitt.recordary.endpoint.follower;

import com.fairy_pitt.recordary.common.entity.FollowerEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.FollowerRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FollowerControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private FollowerRepository followerRepository;
    @Autowired
    private UserRepository userRepository;

    private MockMvc mockMvc;

    public MockHttpSession session;
    public MockHttpServletRequest request;

    @Before
    public void setUp() throws Exception{
        session = new MockHttpSession();
        session.setAttribute("loginUser", "testUser1");

        request = new MockHttpServletRequest();
        request.setSession(session);
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
    }

    @After
    public void tearDown() throws Exception{
        followerRepository.deleteAll();
        userRepository.deleteAll();
        session.clearAttributes();
        session = null;
    }

    @Test
    public void Follower_팔로우() throws Exception{ // session 문제
        //given
        UserEntity targetFK = userRepository.save(UserEntity.builder()
                .userId("testUser2")
                .userPw("testPassword")
                .userNm("테스트 유저2")
                .build());

        String url = "http://localhost:" + port + "/follow/" + targetFK.getUserCd();

//        //when
//        ResponseEntity<Boolean> responseEntity = restTemplate.getForEntity(url, Boolean.class);
//
//        //then
//        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
//        assertThat(responseEntity.getBody()).isEqualTo(true);
//
//        List<FollowerEntity> all = followerRepository.findAll();
//        assertThat(all.get(0).getUserFK().getUserId()).isEqualTo("testUser1");
//        assertThat(all.get(0).getTargetFK().getUserCd()).isEqualTo(targetFK.getUserCd());
    }

    @Test
    public void Follower_팔로워목록() throws Exception{
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

        followerRepository.save(FollowerEntity.builder()
                .userFK(user2)
                .targetFK(user1)
                .build());
        followerRepository.save(FollowerEntity.builder()
                .userFK(user3)
                .targetFK(user1)
                .build());

        String url = "http://localhost:" + port + "/follower/" + user1.getUserCd();

        //when
        ResponseEntity<List> responseEntity = restTemplate.getForEntity(url, List.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().size()).isEqualTo(2);
    }

    @Test
    public void Follower_팔로잉목록() throws Exception{
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

        followerRepository.save(FollowerEntity.builder()
                .userFK(user1)
                .targetFK(user2)
                .build());
        followerRepository.save(FollowerEntity.builder()
                .userFK(user1)
                .targetFK(user3)
                .build());

        String url = "http://localhost:" + port + "/following/" + user1.getUserCd();

        //when
        ResponseEntity<List> responseEntity = restTemplate.getForEntity(url, List.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().size()).isEqualTo(2);
    }

    @Test
    public void Follower_친구목록() throws Exception{
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

        followerRepository.save(FollowerEntity.builder()
                .userFK(user1)
                .targetFK(user2)
                .build());
        followerRepository.save(FollowerEntity.builder()
                .userFK(user2)
                .targetFK(user1)
                .build());
        followerRepository.save(FollowerEntity.builder()
                .userFK(user1)
                .targetFK(user3)
                .build());
        followerRepository.save(FollowerEntity.builder()
                .userFK(user3)
                .targetFK(user1)
                .build());
        followerRepository.save(FollowerEntity.builder()
                .userFK(user1)
                .targetFK(user4)
                .build());

        String url = "http://localhost:" + port + "/friends/" + user1.getUserCd();

        //when
        ResponseEntity<List> responseEntity = restTemplate.getForEntity(url, List.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().size()).isEqualTo(2);
    }
}
