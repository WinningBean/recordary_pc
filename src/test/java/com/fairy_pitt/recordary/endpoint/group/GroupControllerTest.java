package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupSaveRequestDto;

import com.fairy_pitt.recordary.endpoint.group.dto.GroupUpdateRequestDto;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class GroupControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @After
    public void tearDown() throws Exception{
        groupRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void Group_생성된다() throws  Exception{

        //given
        UserEntity saveUser = userRepository.save(UserEntity.builder()
                .userId("test")
                .userPw("test")
                .userNm("테스트 유저")
                .build());

        String groupName ="test";
        Boolean groupState = true;
        String groupPic = "asd";
        String  groupEx = "test";

        GroupSaveRequestDto requestDto = GroupSaveRequestDto.createGroupBuilder()
                .userId(saveUser.getUserId())
                .groupName(groupName)
                .groupState(true)
                .groupPic(groupPic)
                .groupEx(groupEx)
                .build();

        String url = "http://localhost:" + port + "group/create";

        //when
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<GroupEntity> all = groupRepository.findAll();
        assertThat(all.get(0).getGroupEx()).isEqualTo(groupEx);
        assertThat(all.get(0).getGroupName()).isEqualTo(groupName);
    }


    @Test
    public void Group_정보수정() throws  Exception{
        //given
        UserEntity saveUser = userRepository.save(UserEntity.builder()
                .userId("test")
                .userPw("test")
                .userNm("테스트 유저")
                .build());

        String groupName ="test";
        Boolean groupState = true;
        String groupPic = "asd";
        String  groupEx = "test";

        GroupEntity groupEntity = groupRepository.save(  GroupEntity.builder()
                .gMstUserFK(saveUser)
                .groupName(groupName)
                .groupState(true)
                .groupPic(groupPic)
                .groupEx(groupEx)
                .build());

        Long groupId = groupEntity.getGroupCd();
        String groupPic2 = "asd";
        String  groupEx2 = "test";

        GroupUpdateRequestDto groupUpdateRequestDto = GroupUpdateRequestDto.updateGroupBuilder()
                .groupEx(groupEx2)
                .groupName(groupName)
                .groupPic(groupPic2)
                .groupState(true)
                .build();

        String url = "http://localhost:" + port + "group/update/" + groupId;

        //when
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, groupUpdateRequestDto, Long.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<GroupEntity> all = groupRepository.findAll();
        assertThat(all.get(0).getGroupEx()).isEqualTo(groupEx2);
        assertThat(all.get(0).getGroupName()).isEqualTo(groupName);
    }

    @Test
    public void Group_방장위임() throws  Exception{
        //given
        UserEntity saveUser = userRepository.save(UserEntity.builder()
                .userId("test2")
                .userPw("test")
                .userNm("테스트 유저")
                .build());

        String groupName ="test";
        Boolean groupState = true;
        String groupPic = "asd";
        String  groupEx = "test";

        GroupEntity groupEntity = groupRepository.save(  GroupEntity.builder()
                .gMstUserFK(saveUser)
                .groupName(groupName)
                .groupState(true)
                .groupPic(groupPic)
                .groupEx(groupEx)
                .build());

        Long groupId = groupEntity.getGroupCd();


        UserEntity changeUser = userRepository.save(UserEntity.builder()
                .userId("test222222222")
                .userPw("test2222")
                .userNm("테스트 유저222222")
                .build());

        String url = "http://localhost:" + port + "group/changeMaster/" + groupId;
        String userId  = changeUser.getUserId();
        //when
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url,userId,Long.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isGreaterThan(0L);

        List<GroupEntity> all = groupRepository.findAll();
        assertThat(all.get(0).getGMstUserFK().getUserCd()).isEqualTo(changeUser.getUserCd());
        assertThat(all.get(0).getGroupName()).isEqualTo(groupName);
    }

    @Test
    public void Group_검색() throws  Exception{

        //given
        UserEntity saveUser = userRepository.save(UserEntity.builder()
                .userId("test")
                .userPw("test")
                .userNm("테스트 유저")
                .build());

        String groupName ="test";
        Boolean groupState = true;
        String groupPic = "asd";
        String  groupEx = "test";

        GroupEntity groupEntity = groupRepository.save(  GroupEntity.builder()
                .gMstUserFK(saveUser)
                .groupName(groupName)
                .groupState(true)
                .groupPic(groupPic)
                .groupEx(groupEx)
                .build());

        GroupEntity groupEntity2 = groupRepository.save(  GroupEntity.builder()
                .gMstUserFK(saveUser)
                .groupName(groupName)
                .groupState(true)
                .groupPic(groupPic)
                .groupEx(groupEx)
                .build());


        String url = "http://localhost:" + port + "group/readAll";

        //when
        ResponseEntity<List> responseEntity = restTemplate.getForEntity(url,List.class);


        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().size()).isEqualTo(2);

    }
}
