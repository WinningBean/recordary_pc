package com.fairy_pitt.recordary.endpoint.chat.dto;

import com.fairy_pitt.recordary.common.domain.ChatRoomEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupRequestDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@Getter
public class ChatRoomResponseDto {

    private Long roomCd;
    private Long targetCd;
    private String targetNm;
    private  String targetPic;
    private String lastChat;
    private List<ChatResponseDto> chatList;

    public ChatRoomResponseDto(ChatRoomEntity entity)
    {
        this.roomCd = entity.getRoomCd();
       // this.groupCd = entity.getGroupFK().getGroupCd();
        this.chatList = entity.getChatList().stream().map(ChatResponseDto::new).collect(Collectors.toList());
    }

    public ChatRoomResponseDto(ChatRoomEntity entity, String last, UserEntity target)
    {
        this.roomCd = entity.getRoomCd();
        if (entity.getGroupFK() != null){
            this.targetCd = entity.getGroupFK().getGroupCd();
            this.targetNm = entity.getGroupFK().getGroupNm();
            this.targetPic = entity.getGroupFK().getGroupPic();
        }else {
            this.targetCd = target.getUserCd();
            this.targetNm = target.getUserNm();
            this.targetPic = target.getUserPic();
        }
        this.lastChat = last;
    }
}
