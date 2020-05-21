package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity,Long> {
    ScheduleEntity findByScheduleCd(Long scheduleCd);
    List<ScheduleEntity> findByScheduleStrBetween(Date fromDate, Date toDate);
    List<ScheduleEntity> findByUserFkAndSchedulePublicStateLessThanEqualAndScheduleStrBetween(UserEntity user, int state,Date fromDate, Date toDate);
    List<ScheduleEntity> findByUserFkAndTabFKAndSchedulePublicStateLessThanEqualAndScheduleStrBetween(UserEntity user, ScheduleTabEntity tab, int state, Date fromDate, Date toDate);


}
