package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.PostScheduleShareEntity;
import com.fairy_pitt.recordary.common.entity.ScheduleEntity;
import com.fairy_pitt.recordary.common.pk.PostScheduleSharePK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostScheduleShareRepository  extends JpaRepository<PostScheduleShareEntity, PostScheduleSharePK> {
    PostScheduleShareEntity findByPostFKAndScheduleFK(PostEntity postFK, ScheduleEntity scheduleFK);
    List<PostScheduleShareEntity> findAllByPostFK(PostEntity postEntity);
}
