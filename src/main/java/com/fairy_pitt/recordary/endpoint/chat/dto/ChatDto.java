package com.fairy_pitt.recordary.endpoint.chat.dto;

import com.fairy_pitt.recordary.common.domain.ChatEntity;
import com.fairy_pitt.recordary.common.domain.ChatRoomEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Getter
public class ChatDto {

    private Long roomFK;
    private Long userCd;
    private String userNM;
    private String content;
    private Date createChat;

    public ChatDto(String userNM, Long roomFK, String content){
        this.content = content;
        this.roomFK = roomFK;
        this.userNM = userNM;
    }

    public ChatEntity toEntity( UserEntity user, ChatRoomEntity room)
    {
        return ChatEntity.builder()
                .content(this.content)
                .roomFK(room)
                .userFK(user)
                .build();
    }
}
