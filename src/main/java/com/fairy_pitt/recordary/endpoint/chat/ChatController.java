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
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("user/{roomCd}")
    public void sendToUser(@DestinationVariable Long roomCd,  @Payload ChatDto incoming)
    {
        chatService.create(incoming);
        simpMessagingTemplate.convertAndSend("/topic/chat/" + roomCd, incoming);
    }

    @MessageMapping("group/{roomCd}")
    public void sendToGroup(@DestinationVariable Long roomCd,  @Payload ChatDto incoming)
    {
        chatService.create(incoming);
         simpMessagingTemplate.convertAndSend("/queue/chat/" + roomCd, incoming);
    }
}
