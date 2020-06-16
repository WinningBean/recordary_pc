package com.fairy_pitt.recordary.common.group;

import com.fairy_pitt.recordary.common.domain.GroupApplyEntity;
import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.repository.GroupApplyRepository;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@SpringBootTest
public class GroupApplyRepositoryTest {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupApplyRepository groupApplyRepository;

    @After
    public void cleanUp()
    {
        groupApplyRepository.deleteAll();
        groupRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void GroupApply_생성()
    {
        //given
        UserEntity saveUser = userRepository.save(UserEntity.builder()
                .userId("test")
                .userPw("test")
                .userNm("테스트 유저")
                .build());

        GroupEntity groupEntity = groupRepository.save(  GroupEntity.builder()
                .gMstUserFK(saveUser)
                .groupNm("테스트")
                .groupState(true)
                .groupPic(null)
                .groupEx("테스트")
                .build());

        groupApplyRepository.save(GroupApplyEntity.builder()
                .groupFK(groupEntity)
                .userFK(saveUser)
                .applyState(1)
                .build());

        //when
        List<GroupApplyEntity> applyEntityList = groupApplyRepository.findAll();

        //than
        GroupApplyEntity groupApplyEntity = applyEntityList.get(0);
        assertThat(groupApplyEntity.getGroupFK().getGroupCd()).isEqualTo(groupEntity.getGroupCd());
    }

}
