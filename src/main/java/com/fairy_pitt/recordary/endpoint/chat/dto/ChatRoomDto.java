package com.fairy_pitt.recordary.endpoint.chat.dto;

import com.fairy_pitt.recordary.common.domain.ChatRoomEntity;
import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ChatRoomDto {

    private Long userCd;
    private Long targetCd;
    private Long groupCd;

    public ChatRoomDto(Long userCd,
                       Long targetCd,
                       Long groupCd)
    {
        this.userCd = userCd;
        this.targetCd = targetCd;
        this.groupCd = groupCd;
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
