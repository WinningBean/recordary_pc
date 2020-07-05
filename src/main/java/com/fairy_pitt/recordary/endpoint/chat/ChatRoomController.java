package com.fairy_pitt.recordary.endpoint.chat;

import com.fairy_pitt.recordary.endpoint.chat.dto.ChatResponseDto;
import com.fairy_pitt.recordary.endpoint.chat.dto.ChatRoomDto;
import com.fairy_pitt.recordary.endpoint.chat.dto.ChatRoomResponseDto;
import com.fairy_pitt.recordary.endpoint.chat.service.ChatRoomService;
import com.fairy_pitt.recordary.endpoint.chat.service.ChatService;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupResponseDto;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("room")
@RequiredArgsConstructor
@RestController
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatService chatService;
    private final UserService userService;

    @PostMapping("create")
    public Long create(@RequestBody ChatRoomDto chatRoomDto)
    {
        userService.checkSessionLogout();
        return chatRoomService.create(chatRoomDto);
    }

    @PostMapping("check")
    public List<ChatResponseDto> enterRoom(@RequestBody ChatRoomDto chatRoomDto)
    {
        userService.checkSessionLogout();
        Long roomCd = chatRoomService.enterChat(chatRoomDto);
        if(roomCd != null) return chatService.chatLog(roomCd);
        return null;
    }

    @PostMapping("enter/{roomCd}")
    public List<ChatResponseDto> enter(@PathVariable Long roomCd)
    {
        userService.checkSessionLogout();
        return chatRoomService.enter(roomCd);
    }


    @DeleteMapping("{id}")
    public Boolean delete(@PathVariable Long id)
    {
        userService.checkSessionLogout();
        return chatRoomService.delete(id);
    }

    @GetMapping("list/{userCd}")
    public List<ChatRoomResponseDto> roomList(@PathVariable Long userCd ) {
        userService.checkSessionLogout();
        List<ChatRoomResponseDto> result = new ArrayList<>();
        result.addAll(chatRoomService.chatRoomList(userCd));
        result.addAll(chatRoomService.groupChatList(userCd));
        return  chatRoomService.chatSort(result);
    }

    @GetMapping("check/groupChat/{userCd}")
    public  List<GroupResponseDto> findCreateGroupChat(@PathVariable Long userCd)
    {
        userService.checkSessionLogout();
        return chatRoomService.findCreateGroupChat(userCd);
    }
}
