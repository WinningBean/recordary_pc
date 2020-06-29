package com.fairy_pitt.recordary.endpoint.chat.dto;

import com.fairy_pitt.recordary.common.domain.ChatRoomEntity;
import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.endpoint.group.dto.GroupRequestDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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
    private Boolean isGroup;
    private LocalDateTime lastTime;
    private List<ChatResponseDto> chatList;

    public ChatRoomResponseDto(ChatRoomEntity entity)
    {
        this.roomCd = entity.getRoomCd();
       // this.groupCd = entity.getGroupFK().getGroupCd();
        this.chatList = entity.getChatList().stream().map(ChatResponseDto::new).collect(Collectors.toList());
    }

    public ChatRoomResponseDto(ChatRoomEntity entity, String last, UserEntity target, LocalDateTime time)
    {
        this.roomCd = entity.getRoomCd();
        this.targetCd = target.getUserCd();
        this.targetNm = target.getUserNm();
        this.targetPic = target.getUserPic();
        this.lastChat = last;
        this.lastTime = time;
        this.isGroup = false;
    }

    public ChatRoomResponseDto(ChatRoomEntity entity, GroupEntity group , String last, LocalDateTime time)
    {
        this.roomCd = entity.getRoomCd();
        this.targetCd = group.getGroupCd();
        this.targetNm = group.getGroupNm();
        this.targetPic = group.getGroupPic();
        this.lastChat = last;
        this.lastTime = time;
        this.isGroup = true;
    }
}
