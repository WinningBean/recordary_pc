package com.fairy_pitt.recordary.endpoint.chat;

import com.fairy_pitt.recordary.endpoint.chat.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final SimpMessagingTemplate template;

    @MessageMapping("/")
    @SendToUser("/queue")
    public ChatDto send(ChatDto incoming)
    {
        return incoming;
    }

    @MessageMapping("/topic")
    @SendTo("/topic/user")
    public ChatDto sendTo(ChatDto incoming)
    {
        return incoming;
    }
}
