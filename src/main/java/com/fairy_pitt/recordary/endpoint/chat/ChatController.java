package com.fairy_pitt.recordary.endpoint.chat;

import com.fairy_pitt.recordary.endpoint.chat.dto.ChatDto;
import com.fairy_pitt.recordary.endpoint.chat.service.ChatService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;
    private final UserService userService;

    @PostMapping("chat/sendMessage")
    public Long sendMessage(@RequestBody ChatDto incoming)
    {
        userService.checkSessionLogout();
        Long chatCd =  chatService.create(incoming);
        chatService.stomp(chatCd, incoming.getRoomCd());
        return chatCd;
    }
}
