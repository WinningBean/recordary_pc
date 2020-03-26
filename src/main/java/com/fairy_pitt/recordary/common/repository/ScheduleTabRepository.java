package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.ScheduleTabEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleTabRepository extends JpaRepository<ScheduleTabEntity,Long> {

    ScheduleTabEntity findByTabCd(Long tacCd);
}
