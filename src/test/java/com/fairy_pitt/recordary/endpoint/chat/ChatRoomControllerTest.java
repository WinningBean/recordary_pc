package com.fairy_pitt.recordary.endpoint.chat;

import com.fairy_pitt.recordary.common.domain.ChatEntity;
import com.fairy_pitt.recordary.common.domain.ChatRoomEntity;
import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.repository.ChatRepository;
import com.fairy_pitt.recordary.common.repository.ChatRoomRepository;
import com.fairy_pitt.recordary.common.repository.GroupRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import com.fairy_pitt.recordary.endpoint.chat.dto.ChatDto;
import com.fairy_pitt.recordary.endpoint.chat.dto.ChatRoomDto;
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

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ChatRoomControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private ChatRepository chatRepository;

    @After
    public void tearDown() throws Exception {
        chatRoomRepository.deleteAll();
        groupRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void room_생성() throws Exception {
        //given
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


        Long userCd = userFK.getUserCd();
        Long targetCd = saveUser.getUserCd();

        ChatRoomDto requestDto = new ChatRoomDto(userCd,targetCd,null);


        String url = "http://localhost:" + port + "/room/create";

        //when
        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);

        //then

        List<ChatRoomEntity> all = chatRoomRepository.findAll();
        assertThat(all.size()).isEqualTo(1);
//        assertThat(all.get(0).getUserFK().getUserCd()).isEqualTo(userFK.getUserCd());
//        System.out.print(">>>>>>>>>>>>>>>>>>>>>>>>>> userCd =" + all.get(0).getUserFK().getUserCd());
//        assertThat(all.get(0).getUserFK().getUserCd()).isEqualTo(userCd);

    }

    @Test
    public void roomList_가져오기() throws Exception {

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
                .gMstUserFK(userFK)
                .groupNm("테스트")
                .groupState(true)
                .groupPic(null)
                .groupEx("테스트")
                .build());


        ChatRoomEntity chatRoomEntity =  chatRoomRepository.save(ChatRoomEntity.builder()
                .groupFK(null)
                .targetFK(saveUser)
                .userFK(userFK)
                .build());

        ChatRoomEntity chatRoomEntity2 =  chatRoomRepository.save(ChatRoomEntity.builder()
                .groupFK(groupEntity)
                .targetFK(null)
                .userFK(null)
                .build());

        chatRepository.save(ChatEntity.builder()
                .content("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                .userFK(saveUser)
                .roomFK(chatRoomEntity)
                .build());

        chatRepository.save(ChatEntity.builder()
                .content("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                .userFK(saveUser)
                .roomFK(chatRoomEntity)
                .build());

        chatRepository.save(ChatEntity.builder()
                .content("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                .userFK(saveUser)
                .roomFK(chatRoomEntity2)
                .build());

         chatRepository.save(ChatEntity.builder()
                .content("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                .userFK(saveUser)
                .roomFK(chatRoomEntity2)
                .build());

        chatRepository.save(ChatEntity.builder()
                .content("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                .userFK(saveUser)
                .roomFK(chatRoomEntity2)
                .build());

        chatRepository.save(ChatEntity.builder()
                .content("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                .userFK(saveUser)
                .roomFK(chatRoomEntity2)
                .build());

        Long userCd = userFK.getUserCd();
        Long targetCd = saveUser.getUserCd();

        String url = "http://localhost:" + port + "/room/list/" + userCd;

        //when
        ResponseEntity<List> responseEntity = restTemplate.getForEntity(url, List.class);
        assertThat(responseEntity.getBody().size()).isEqualTo(2);

        List<ChatRoomEntity> all = chatRoomRepository.findAll();
        assertThat(all.size()).isEqualTo(2);

    }

}
