package com.fairy_pitt.recordary.endpoint.chat.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ChatDto {

    private int roomFK;
    private String userNM;
    private String content;

    public ChatDto(String userNM, int roomFK, String content){
        this.content = content;
        this.roomFK = roomFK;
        this.userNM = userNM;
    }

//    public void toEntity()
}
