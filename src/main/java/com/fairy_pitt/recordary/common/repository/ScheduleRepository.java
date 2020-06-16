package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.domain.GroupEntity;
import com.fairy_pitt.recordary.common.domain.ScheduleEntity;
import com.fairy_pitt.recordary.common.domain.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity,Long> {
    ScheduleEntity findByScheduleCd(Long scheduleCd);
    List<ScheduleEntity> findByScheduleStrBetween(Date fromDate, Date toDate);
    List<ScheduleEntity> findByUserFkAndGroupFKIsNullAndSchedulePublicStateLessThanEqualAndScheduleStrBetween(UserEntity user, int state,Date fromDate, Date toDate);
    List<ScheduleEntity> findByUserFkAndGroupFKIsNullAndTabFKAndSchedulePublicStateLessThanEqualAndScheduleStrBetween(UserEntity user, ScheduleTabEntity tab, int state, Date fromDate, Date toDate);
    List<ScheduleEntity> findByUserFkAndGroupFKIsNullAndSchedulePublicStateAndScheduleStrBetween(UserEntity user, int state,Date fromDate, Date toDate);
    List<ScheduleEntity> findByGroupFKAndScheduleStrBetween(GroupEntity group, Date fromDate, Date toDate);

}
