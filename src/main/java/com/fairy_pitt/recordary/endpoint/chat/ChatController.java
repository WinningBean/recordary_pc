package com.fairy_pitt.recordary.endpoint.chat;

import com.fairy_pitt.recordary.endpoint.chat.dto.ChatDto;
import com.fairy_pitt.recordary.endpoint.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;

    @PostMapping("chat/sendMessage")
    public Long sendMessage(@RequestBody ChatDto incoming)
    {
        Long chatCd =  chatService.create(incoming);
        chatService.stomp(chatCd, incoming.getRoomCd());
        return chatCd;
    }
}
