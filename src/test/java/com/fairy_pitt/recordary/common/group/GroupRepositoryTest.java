package com.fairy_pitt.recordary.common.group;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GroupRepositoryTest {

    @Autowired
    private GroupRepository groupRepository;

    @After
    public void cleanUp()
    {
        groupRepository.deleteAll();
    }

    @Test
    public void 그룹_생성하기() {
        //given
       //  UserEntity gMstUserFK =
        String groupName = "테스트 그룹";
        Boolean groupState = true;
        String groupPic = null;
        String  groupEx = "그룹 생성 테스트 중입니다";


        groupRepository.save(GroupEntity.builder()
                .gMstUserFK(null)
                .groupName(groupName)
                .groupState(true)
                .groupPic(null)
                .groupEx(groupEx)
                .build());

        //when
        List<GroupEntity> groupList = groupRepository.findAll();

        //then
        GroupEntity groupEntity = groupList.get(0);
        assertThat(groupEntity.getGroupEx()).isEqualTo(groupEx);
        assertThat(groupEntity.getGroupName()).isEqualTo(groupName);

    }




}
