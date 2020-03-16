package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupSaveRequestDto;

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
public class GroupControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private GroupRepository groupRepository;

    @After
    public void tearDown() throws Exception{
        groupRepository.deleteAll();
    }

    @Test
    public void Group_생성된다() throws  Exception{
        //given
        UserEntity gMstUserFK = null;
        String groupName ="test";
        Boolean groupState = true;
        String groupPic = null;
        String  groupEx = "test";

        GroupSaveRequestDto requestDto = GroupSaveRequestDto.builder()
                .gMstUserFK(null)
                .groupName(groupName)
                .groupState(true)
                .groupPic(null)
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
        // given
        //when
        //then
    }

    @Test
    public void Group_방장위임() throws  Exception{
        // given
        //when
        //then
    }


}
