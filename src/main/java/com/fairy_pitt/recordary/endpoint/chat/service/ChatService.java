package com.fairy_pitt.recordary.endpoint.chat.service;

import com.fairy_pitt.recordary.common.domain.ChatEntity;
import com.fairy_pitt.recordary.common.domain.ChatRoomEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.repository.ChatRepository;
import com.fairy_pitt.recordary.endpoint.chat.dto.ChatDto;
import com.fairy_pitt.recordary.endpoint.chat.dto.ChatResponseDto;
import com.fairy_pitt.recordary.endpoint.group.service.GroupService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final ChatRepository chatRepository;
    private final UserService userService;
    private final ChatRoomService chatRoomService;

    public Long create(ChatDto requestDto)
    {
        LocalDateTime currentDate = LocalDateTime.now();
        UserEntity user = userService.findEntity(requestDto.getUserCd());
        ChatRoomEntity room = chatRoomService.findEntity(requestDto.getRoomCd());
        room.setModifiedDate(currentDate);
        return chatRepository.save(requestDto.toEntity(user,room)).getChatCd();

    }

    public List<ChatResponseDto> chatLog(Long roomCd){
        ChatRoomEntity room = chatRoomService.findEntity(roomCd);
        return chatRepository.findAllByRoomFK(room).stream()
                .map(ChatResponseDto :: new)
                .collect(Collectors.toList());
    }

    public  void stomp(Long chatCd, Long roomCd)
    {
        ChatEntity chatEntity = chatRepository.findAllByChatCd(chatCd);
        ChatRoomEntity room = chatRoomService.findEntity(roomCd);
        ChatResponseDto chat = new ChatResponseDto(chatEntity);
        if(room.getGroupFK() == null)
        {
            simpMessagingTemplate.convertAndSend("/topic/chat/" + roomCd, chat);
        }else {
            simpMessagingTemplate.convertAndSend("/queue/chat/" + roomCd, chat);
        }
    }
}
