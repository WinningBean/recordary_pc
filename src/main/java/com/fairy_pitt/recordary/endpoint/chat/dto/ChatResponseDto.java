package com.fairy_pitt.recordary.endpoint.chat.dto;

import com.fairy_pitt.recordary.common.domain.ChatEntity;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor
@Getter
public class ChatResponseDto {

    private UserResponseDto sendUser;
    private String content;
    private LocalDateTime crateChat;


    public ChatResponseDto(ChatEntity entity)
    {
        this.content = entity.getContent();
        this.sendUser = new UserResponseDto(entity.getUserFK());
        this.crateChat = entity.getCreatedDate();
    }
}
