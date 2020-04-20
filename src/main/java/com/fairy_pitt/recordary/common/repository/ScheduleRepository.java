package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import com.fairy_pitt.recordary.endpoint.Schedule.dto.ScheduleSaveRequestDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity,Long> {
    ScheduleEntity findByScheduleCd(Long scheduleCd);
    List<ScheduleEntity> findByScheduleStrBetween(Date fromDate, Date toDate);
    List<ScheduleEntity> findByUserFkAndSchedulePublicStateAndScheduleStrBetween(UserEntity user, int state,Date fromDate, Date toDate);

  //  ResponseEntity<Long> postForEntity(String url, ScheduleSaveRequestDto requestDto, Class<Long> longClass);
    // List<ScheduleEntity> findAllByPostCdFK(PostEntity postEntity);

}
