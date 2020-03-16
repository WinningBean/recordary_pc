package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.repository.PostRepository;
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

    @After
    public void tearDown() throws Exception {
        postRepository.deleteAll();
    }

    @Test
    public void Post_등록된다() throws Exception {
        //given
        String postEx = "테스트 게시글";
        int postPublicState = 1;
        String postStrYMD = "20200310";
        String postEndYMD = "20200311";

        PostSaveRequestDto requestDto = PostSaveRequestDto.builder()
                .postEx(postEx)
                .postPublicState(postPublicState)
                .postStrYMD(postStrYMD)
                .postEndYMD(postEndYMD)
                .build();

        String url = "http://localhost:" + port + "/post/";

        //when
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<PostEntity> all = postRepository.findAll();
        assertThat(all.get(0).getPostEx()).isEqualTo(postEx);
        assertThat(all.get(0).getPostPublicState()).isEqualTo(postPublicState);
        assertThat(all.get(0).getPostStrYMD()).isEqualTo(postStrYMD);
        assertThat(all.get(0).getPostEndYMD()).isEqualTo(postEndYMD);
    }

    @Test
    public void Post_수정된다() throws Exception {
        //given
        PostEntity savedPost = postRepository.save(PostEntity.builder()
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
}