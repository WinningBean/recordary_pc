package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.ChatRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, Long> {
}
