package com.fairy_pitt.recordary.endpoint.chat.dto;

import com.fairy_pitt.recordary.common.domain.ChatRoomEntity;
import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ChatRoomDto {

    private Long userFk;
    private Long targetFk;
    private Long groupFk;

    public ChatRoomDto(Long userFk,
                       Long targetFk,
                       Long groupFk)
    {
        this.userFk = userFk;
        this.targetFk = targetFk;
        this.groupFk = groupFk;
    }

    public ChatRoomEntity toEntity(UserEntity user,
                                   UserEntity target,
                                   GroupEntity group)
    {
        return ChatRoomEntity.builder()
                .userFK(user)
                .groupFK(group)
                .targetFK(target)
                .build();
    }

}
