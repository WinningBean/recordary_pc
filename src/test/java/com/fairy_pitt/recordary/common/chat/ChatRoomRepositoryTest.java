package com.fairy_pitt.recordary.common.chat;

import com.fairy_pitt.recordary.common.domain.ChatRoomEntity;
import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.repository.ChatRepository;
import com.fairy_pitt.recordary.common.repository.ChatRoomRepository;
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
public class ChatRoomRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @After
    public void cleanup() throws Exception {
        chatRoomRepository.deleteAll();
        groupRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void ChatRoom_생성()
    {
        UserEntity userFK = userRepository.save(UserEntity.builder()
                .userId("testUser1")
                .userPw("testPassword")
                .userNm("테스트 유저1")
                .build());

        UserEntity saveUser = userRepository.save(UserEntity.builder()
                .userId("test")
                .userPw("test")
                .userNm("테스트 유저")
                .build());

        GroupEntity groupEntity = groupRepository.save(GroupEntity.builder()
                .gMstUserFK(saveUser)
                .groupNm("테스트")
                .groupState(true)
                .groupPic(null)
                .groupEx("테스트")
                .build());

        chatRoomRepository.save(ChatRoomEntity.builder()
                .groupFK(groupEntity)
                .targetFK(null)
                .userFK(userFK)
                .build());

        chatRoomRepository.save(ChatRoomEntity.builder()
                .groupFK(null)
                .targetFK(saveUser)
                .userFK(userFK)
                .build());

        //when
        List<ChatRoomEntity> chatRoomEntityList = chatRoomRepository.findAll();

        //then
        ChatRoomEntity chatRoomEntity = chatRoomEntityList.get(1);
        assertThat(chatRoomEntity.getUserFK().getUserCd()).isEqualTo(userFK.getUserCd());
        assertThat(chatRoomEntity.getTargetFK().getUserCd()).isEqualTo(saveUser.getUserCd());

        ChatRoomEntity chatRoom = chatRoomEntityList.get(0);
        assertThat(chatRoom.getUserFK().getUserCd()).isEqualTo(userFK.getUserCd());
        assertThat(chatRoom.getGroupFK().getGroupCd()).isEqualTo(groupEntity.getGroupCd());
    }
}
