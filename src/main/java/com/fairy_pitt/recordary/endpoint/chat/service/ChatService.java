package com.fairy_pitt.recordary.endpoint.chat.service;

import com.fairy_pitt.recordary.common.domain.ChatRoomEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.repository.ChatRepository;
import com.fairy_pitt.recordary.endpoint.chat.dto.ChatDto;
import com.fairy_pitt.recordary.endpoint.chat.dto.ChatResponseDto;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserService userService;
    private final GroupService groupService;
    private final ChatRoomService chatRoomService;

    public void create(ChatDto requestDto)
    {
        UserEntity user = userService.findEntity(requestDto.getUserCd());
        ChatRoomEntity room = chatRoomService.findEntity(requestDto.getRoomFK());

        chatRepository.save(requestDto.toEntity(user,room));
//        return true;
    }

    public List<ChatResponseDto> chatLog(Long roomCd){
        ChatRoomEntity room = chatRoomService.findEntity(roomCd);
        return chatRepository.findAllByRoomFK(room).stream()
                .map(ChatResponseDto :: new)
                .collect(Collectors.toList());
    }

}
