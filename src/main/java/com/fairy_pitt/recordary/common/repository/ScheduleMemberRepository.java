package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.domain.ScheduleEntity;
import com.fairy_pitt.recordary.common.domain.ScheduleMemberEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.pk.ScheduleMemberEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleMemberRepository extends JpaRepository<ScheduleMemberEntity, ScheduleMemberEntityPK> {
    List<ScheduleMemberEntity> findByUserFKAndAndScheduleState(UserEntity user, Boolean state);
    ScheduleMemberEntity findByUserFKAndScheduleFK(UserEntity user, ScheduleEntity schedule);
}
