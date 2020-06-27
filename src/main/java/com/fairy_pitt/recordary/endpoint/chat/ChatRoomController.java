package com.fairy_pitt.recordary.endpoint.chat;

import com.fairy_pitt.recordary.endpoint.chat.dto.ChatResponseDto;
import com.fairy_pitt.recordary.endpoint.chat.dto.ChatRoomDto;
import com.fairy_pitt.recordary.endpoint.chat.dto.ChatRoomResponseDto;
import com.fairy_pitt.recordary.endpoint.chat.service.ChatRoomService;
import com.fairy_pitt.recordary.endpoint.chat.service.ChatService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatService chatService;


    @PostMapping("room/create")
    public Long create(ChatRoomDto chatRoomDto)
    {
       return chatRoomService.create(chatRoomDto);
    }


    @DeleteMapping("room/{id}")
    public Boolean delete(@PathVariable Long id)
    {
        return chatRoomService.delete(id);
    }

    @GetMapping("room/join")
    public List<ChatResponseDto> joinChat(ChatRoomDto chatRoomDto)
    {
        Long roomCd = chatRoomService.joinChat(chatRoomDto);
        if(roomCd != null) return chatService.chatLog(roomCd);
        return null;
    }

    @GetMapping("join/{roomCd}")
    public ChatRoomResponseDto join(@PathVariable Long roomCd)
    {
        return chatRoomService.join(roomCd);
    }

    @GetMapping("chat/user/{id}")
    public List<ChatRoomResponseDto> chatList(@PathVariable Long id )
    {
        return chatRoomService.chatRoomList(id);
    }
}
