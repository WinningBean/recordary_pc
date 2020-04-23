package com.fairy_pitt.recordary.endpoint.group;

import com.fairy_pitt.recordary.common.entity.GroupApplyEntity;
import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.GroupMemberEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.GroupApplyRepository;
import com.fairy_pitt.recordary.common.repository.GroupMemberRepository;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupApplyRequestDto;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupMemberRequestDto;
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
public class GroupMemberControllerTest {

        @LocalServerPort
        private int port;

        @Autowired
        private TestRestTemplate restTemplate;

        @Autowired
        private GroupMemberRepository groupMemberRepository;

        @Autowired
        private GroupRepository groupRepository;

        @Autowired
        private GroupApplyRepository groupApplyRepository;

        @Autowired
        private UserRepository userRepository;


        @After
        public void tearDown() throws Exception {
            groupMemberRepository.deleteAll();
            groupRepository.deleteAll();
            userRepository.deleteAll();
        }

        @Test
        public void GroupApply_신청() throws Exception {

            //given
            UserEntity saveUser = userRepository.save(UserEntity.builder()
                    .userId("test")
                    .userPw("test")
                    .userNm("테스트 유저")
                    .build());

            String groupName = "test";
            Boolean groupState = true;
            String groupPic = "asd";
            String groupEx = "test";


            GroupEntity groupEntity = groupRepository.save(GroupEntity.builder()
                    .gMstUserFK(saveUser)
                    .groupName(groupName)
                    .groupState(true)
                    .groupPic(groupPic)
                    .groupEx(groupEx)
                    .build());

            GroupApplyEntity groupApplyEntity = groupApplyRepository.save(GroupApplyEntity.builder()
                    .groupFK(groupEntity)
                    .userFK(saveUser)
                    .applyState(1)
                    .build());

            Long group = groupEntity.getGroupCd();
            Long user = saveUser.getUserCd();

            GroupMemberRequestDto requestDto = GroupMemberRequestDto.builder()
                    .userCd(user)
                    .groupCd(group)
                    .build();

            String url = "http://localhost:" + port + "groupMember/create";

            //when
            ResponseEntity<Boolean> responseEntity = restTemplate.postForEntity(url, requestDto, Boolean.class);

            //then
            assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

            List<GroupMemberEntity> all = groupMemberRepository.findAll();
            assertThat(all.get(0).getGroupFK().getGroupCd()).isEqualTo(group);
            assertThat(all.get(0).getUserFK().getUserCd()).isEqualTo(user);
        }
}
