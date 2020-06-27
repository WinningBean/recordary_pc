package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.domain.ChatRoomEntity;
import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, Long> {

    ChatRoomEntity findByUserFKAndTargetFK(UserEntity user, UserEntity target);
    ChatRoomEntity findByGroupFK(GroupEntity group);
    ChatRoomEntity findByRoomCd(Long roomCd);

    List<ChatRoomEntity> findAllByUserFKOrTargetFKOrderByModifiedDate(UserEntity user, UserEntity target);

    Boolean existsByUserFKAndTargetFK(UserEntity user, UserEntity target);
    Boolean existsByGroupFK(GroupEntity group);
}
