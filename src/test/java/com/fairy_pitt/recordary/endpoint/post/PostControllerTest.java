package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.common.entity.*;
import com.fairy_pitt.recordary.common.repository.*;
import com.fairy_pitt.recordary.endpoint.post.dto.PostResponseDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.post.dto.PostUpdateRequestDto;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PostControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FollowerRepository followerRepository;
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @After
    public void tearDown() throws Exception {
        postRepository.deleteAll();
        groupRepository.deleteAll();
        followerRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void Post_등록된다() throws Exception {
        //given
        UserEntity user1 = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        String postEx = "테스트 게시글";
        int postPublicState = 1;
        String postStrYMD = "20200310";
        String postEndYMD = "2c0200311";

        PostSaveRequestDto requestDto = PostSaveRequestDto.builder()
                .userCd(user1.getUserCd())
                .groupCd(null)
                .postOriginCd(null)
                .scheduleCd(null)
                .mediaCd(null)
                .postEx(postEx)
                .postPublicState(postPublicState)
                .postStrYMD(postStrYMD)
                .postEndYMD(postEndYMD)
                .build();

        String url = "http://localhost:" + port + "/post/";

        //when
        ResponseEntity<Boolean> responseEntity = restTemplate.postForEntity(url, requestDto, Boolean.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isEqualTo(true);

        List<PostEntity> all = postRepository.findAll();
        assertThat(all.get(0).getUserFK().getUserCd()).isEqualTo(user1.getUserCd());
        assertThat(all.get(0).getPostEx()).isEqualTo(postEx);
        assertThat(all.get(0).getPostPublicState()).isEqualTo(postPublicState);
        assertThat(all.get(0).getPostStrYMD()).isEqualTo(postStrYMD);
        assertThat(all.get(0).getPostEndYMD()).isEqualTo(postEndYMD);
    }

    @Test
    public void Post_수정된다() throws Exception {
        //given
        UserEntity user1 = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        PostEntity savedPost = postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());

        Long updateCd = savedPost.getPostCd();
        String expectedPostEx = "테스트 게시글2";
        int expectedPostPublicState = 0;

        PostUpdateRequestDto requestDto = PostUpdateRequestDto.builder()
                .postEx(expectedPostEx)
                .postPublicState(expectedPostPublicState)
                .build();

        String url = "http://localhost:" + port + "/post/" + updateCd;

        HttpEntity<PostUpdateRequestDto> requestDtoHttpEntity = new HttpEntity<>(requestDto);

        //when
        ResponseEntity<Long> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestDtoHttpEntity, Long.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<PostEntity> all = postRepository.findAll();
        assertThat(all.get(0).getPostEx()).isEqualTo(expectedPostEx);
        assertThat(all.get(0).getPostPublicState()).isEqualTo(expectedPostPublicState);
    }

    @Test
    public void Post_게시물정보() throws Exception{
        //given
        UserEntity user1 = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        PostEntity post = postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());

        String url = "http://localhost:" + port + "/post/" + post.getPostCd();

        //when
        ResponseEntity<PostResponseDto> responseEntity = restTemplate.getForEntity(url, PostResponseDto.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().getUserFK().getUserCd()).isEqualTo(user1.getUserCd());
        assertThat(responseEntity.getBody().getPostCd()).isEqualTo(post.getPostCd());
        assertThat(responseEntity.getBody().getPostEx()).isEqualTo(post.getPostEx());
    }

    @Test
    public void Post_사용자게시물() throws Exception{
        //given
        UserEntity user1 = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글1")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글2")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글3")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글4")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());

        String url = "http://localhost:" + port + "/post/user/" + user1.getUserCd();

        //when
        ResponseEntity<List> responseEntity = restTemplate.getForEntity(url, List.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().size()).isEqualTo(4);
    }

    @Test
    public void Post_사용자게시물검색() throws Exception{
        //given
        UserEntity user1 = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글1")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글2")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글3")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("게시글4")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());

        String searchContent = "테스트";

        String url = "http://localhost:" + port + "/post/user/" + user1.getUserCd() + "/search?input=" + searchContent;

        //when
        ResponseEntity<List> responseEntity = restTemplate.getForEntity(url, List.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().size()).isEqualTo(3);
    }


    @Test
    public void Post_그룹게시물검색() throws Exception{
        //given
        UserEntity user1 = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        GroupEntity group1 = groupRepository.save(GroupEntity.builder()
                .gMstUserFK(user1)
                .groupNm("testGroup1")
                .groupState(true)
                .groupPic(null)
                .groupEx("testEx")
                .build());

        postRepository.save(PostEntity.builder()
                .userFK(user1)
                .groupFK(group1)
                .postEx("테스트 게시글1")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user1)
                .groupFK(group1)
                .postEx("테스트 게시글2")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user1)
                .groupFK(group1)
                .postEx("테스트 게시글3")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user1)
                .groupFK(group1)
                .postEx("게시글4")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());

        String searchContent = "테스트";

        String url = "http://localhost:" + port + "/post/group/" + group1.getGroupCd() + "/search?input=" + searchContent;

        //when
        ResponseEntity<List> responseEntity = restTemplate.getForEntity(url, List.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().size()).isEqualTo(3);
    }

    @Test
    public void Post_타임라인() throws Exception{
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
                .userFK(user1)
                .targetFK(user3)
                .build());

        GroupEntity group1 = groupRepository.save(GroupEntity.builder()
                .gMstUserFK(user1)
                .groupNm("testGroup1")
                .groupState(true)
                .groupPic(null)
                .groupEx("testEx")
                .build());
        GroupEntity group2 = groupRepository.save(GroupEntity.builder()
                .gMstUserFK(user4)
                .groupNm("testGroup2")
                .groupState(true)
                .groupPic(null)
                .groupEx("testEx")
                .build());

        groupMemberRepository.save(GroupMemberEntity.builder()
                .groupFK(group2)
                .userFK(user1)
                .build());

        postRepository.save(PostEntity.builder()
                .userFK(user1)
                .postEx("테스트 게시글1")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user2)
                .postEx("테스트 게시글2")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user2)
                .groupFK(group1)
                .postEx("테스트 게시글3")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user3)
                .postEx("테스트 게시글4")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user4)
                .groupFK(group2)
                .postEx("테스트 게시글5")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());
        postRepository.save(PostEntity.builder()
                .userFK(user4)
                .postEx("테스트 게시글6")
                .postPublicState(1)
                .postStrYMD("20200310")
                .postEndYMD("20200311")
                .build());


        String url = "http://localhost:" + port + "/post/timeLine/" + user1.getUserCd();

        //when
        ResponseEntity<List> responseEntity = restTemplate.getForEntity(url, List.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().size()).isEqualTo(5);

    }
}