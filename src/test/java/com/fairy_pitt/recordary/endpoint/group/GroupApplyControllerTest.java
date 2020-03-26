package com.fairy_pitt.recordary.endpoint.group;


import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.GroupApplyRepository;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupApplyRequestDto;
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
public class GroupApplyControllerTest {


    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private GroupApplyRepository groupApplyRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;


    @After
    public void tearDown() throws Exception{
        groupApplyRepository.deleteAll();
//        userRepository.deleteAll();
        groupRepository.deleteAll();
    }

    @Test
    public void GroupApply_신청() throws Exception {

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

        String user = saveUser.getUserId();

        GroupEntity groupEntity = groupRepository.save(  GroupEntity.builder()
                .gMstUserFK(saveUser)
                .groupName(groupName)
                .groupState(true)
                .groupPic(groupPic)
                .groupEx(groupEx)
                .build());
        Long group = groupEntity.getGroupCd();

        GroupApplyRequestDto requestDto = GroupApplyRequestDto.builder()
                .userId(user)
                .groupCd(group)
                .applyState(1)
                .build();

        String url = "http://localhost:" + port + "groupApply/create";
        //when
        ResponseEntity<Integer> responseEntity = restTemplate.postForEntity(url, requestDto, Integer.class);

        //then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        List<GroupApplyEntity> all = groupApplyRepository.findAll();
        assertThat(all.get(0).getGroupFK().getGroupCd()).isEqualTo(group);
        assertThat(all.get(0).getUserFK().getUserId()).isEqualTo(user);
    }


}
