package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.domain.ChatEntity;
import com.fairy_pitt.recordary.common.domain.ChatRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatEntity, Long> {
    ChatEntity findAllByChatCd(Long chatCd);
    List<ChatEntity> findAllByRoomFK(ChatRoomEntity roomEntity);
}
