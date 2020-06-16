package com.fairy_pitt.recordary.common.group;

import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.common.domain.GroupMemberEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.repository.GroupMemberRepository;
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
public class GroupMemberRepositoryTest {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @After
    public void cleanUp()
    {
        groupRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void GroupApply_생성()
    {
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

        groupMemberRepository.save(GroupMemberEntity.builder()
                    .groupFK(groupEntity)
                    .userFK(saveUser)
                    .build());

        //when
        List<GroupMemberEntity> groupMemberEntities = groupMemberRepository.findAll();

        //than
        GroupMemberEntity groupMemberEntity = groupMemberEntities.get(0);
        assertThat(groupMemberEntity.getGroupFK().getGroupCd()).isEqualTo(groupEntity.getGroupCd());
    }

}
