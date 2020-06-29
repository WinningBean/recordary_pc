package com.fairy_pitt.recordary.endpoint.chat.dto;

import com.fairy_pitt.recordary.common.domain.ChatEntity;
import com.fairy_pitt.recordary.common.domain.ChatRoomEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Getter
public class ChatDto {

    private Long roomCd;
    private Long userCd;
    private String userNM;
    private String content;
    private Date createChat;

    public ChatDto(String userNM,
                   Long roomCd,
                   String content,
                   Long userCd){

        this.content = content;
        this.roomCd = roomCd;
        this.userNM = userNM;
        this.userCd = userCd;
    }

    @Builder
    public ChatEntity toEntity( UserEntity user, ChatRoomEntity room)
    {
        return ChatEntity.builder()
                .content(this.content)
                .roomFK(room)
                .userFK(user)
                .build();
    }
}
