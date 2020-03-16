package com.fairy_pitt.recordary.endpoint.user;

import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.user.dto.UserLoginRequestDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserUpdateRequestDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserPasswordHashService;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerTest {
    @LocalServerPort
    private  int port;

    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserPasswordHashService userPasswordHashService;

    @After
    public void tearDown() throws Exception{
        userRepository.deleteAll();
    }

    private static String staticUserId = "testUser";

    @Test
    public void User_가능한아이디() throws Exception{
        String url = "http://localhost:" + port + "/user/possibleId/" + staticUserId;

        //when
        ResponseEntity<Boolean> responseEntity = restTemplate.getForEntity(url, Boolean.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isEqualTo(true);
    }

    @Test
    public void User_불가능한아이디() throws Exception{
        User_회원가입();

        String url = "http://localhost:" + port + "/user/possibleId/" + staticUserId;

        //when
        ResponseEntity<Boolean> responseEntity = restTemplate.getForEntity(url, Boolean.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isEqualTo(false);
    }

    @Test
    public void User_회원가입() throws Exception{
        //given
        String userPw = "testPassword";
        String userNm = "테스트 유저";

        String hashedPassword = userPasswordHashService.getSHA256(userPw);

        UserSaveRequestDto requestDto = UserSaveRequestDto.builder()
                .userId(staticUserId)
                .userPw(userPw)
                .userNm(userNm)
                .build();

        User_가능한아이디();

        String url = "http://localhost:" + port + "/user/join";

        //when
        ResponseEntity<Boolean> responseEntity = restTemplate.postForEntity(url, requestDto, Boolean.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isEqualTo(true);

        List<UserEntity> all = userRepository.findAll();
        assertThat(all.get(0).getUserId()).isEqualTo(staticUserId);
        assertThat(all.get(0).getUserPw()).isEqualTo(hashedPassword);
        assertThat(all.get(0).getUserNm()).isEqualTo(userNm);
    }

//    @Test
//    public void User_수정된다() throws Exception{
//        //given
//        UserEntity saveUser = userRepository.save(UserEntity.builder()
//                .userId(staticUserId)
//                .userPw(userPasswordHashService.getSHA256("testPassword"))
//                .userNm("테스트 유저")
//                .build());
//
//        String updateId = saveUser.getUserId();
//        String expectedUserPw = "testPassword2";
//        String expectedUserNm = "테스트 유저2";
//        String expectedUserEx = "상태 메세지";
//
//        UserUpdateRequestDto requestDto = UserUpdateRequestDto.builder()
//                .userPw(expectedUserPw)
//                .userNm(expectedUserNm)
//                .userEx(expectedUserEx)
//                .build();
//
//        String url = "http://localhost:" + port + "/user/ " + updateId;
//
//        HttpEntity<UserUpdateRequestDto> requestDtoHttpEntity = new HttpEntity<>(requestDto);
//
//        //when
//        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestDtoHttpEntity, String.class);
//
//        //then
//        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
//        assertThat(responseEntity.getBody()).isEqualTo(staticUserId);
//
//        List<UserEntity> all = userRepository.findAll();
//        assertThat(all.get(0).getUserPw()).isEqualTo(userPasswordHashService.getSHA256(expectedUserPw));
//        assertThat(all.get(0).getUserNm()).isEqualTo(expectedUserNm);
//        assertThat(all.get(0).getUserEx()).isEqualTo(expectedUserEx);
//    }

    @Test
    public void User_로그인() throws Exception{
        //given
        User_회원가입();
        UserLoginRequestDto requestDto = UserLoginRequestDto.builder()
                .userId(staticUserId)
                .userPw("testPassword")
                .build();

        String url = "http://localhost:" + port + "/user/login";

        //when
        ResponseEntity<UserResponseDto> responseEntity = restTemplate.postForEntity(url, requestDto, UserResponseDto.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(((UserResponseDto)responseEntity.getBody()).getUserId()).isEqualTo(staticUserId);
    }
}
