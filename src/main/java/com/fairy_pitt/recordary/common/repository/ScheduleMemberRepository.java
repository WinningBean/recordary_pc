package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleMemberEntity;
import com.fairy_pitt.recordary.common.pk.ScheduleMemberEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleMemberRepository extends JpaRepository<ScheduleMemberEntity, ScheduleMemberEntityPK> {
}
