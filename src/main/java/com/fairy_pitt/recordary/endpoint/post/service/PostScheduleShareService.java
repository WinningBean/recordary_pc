package com.fairy_pitt.recordary.endpoint.post.service;

import com.fairy_pitt.recordary.common.domain.PostEntity;
import com.fairy_pitt.recordary.common.domain.PostScheduleShareEntity;
import com.fairy_pitt.recordary.common.domain.ScheduleEntity;
import com.fairy_pitt.recordary.common.repository.PostScheduleShareRepository;
import com.fairy_pitt.recordary.endpoint.post.dto.PostScheduleShareSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class PostScheduleShareService {
    private final PostScheduleShareRepository postScheduleShareRepository;
    private final PostService postService;
    private final ScheduleService scheduleService;

    @Transactional
    public int saveList(PostScheduleShareSaveRequestDto requestDto){
        PostEntity postEntity = postService.findEntity(postService.save(requestDto.getPostFK()));
        int returnNum = 0;
        for (Long scheduleCd : requestDto.getScheduleCdList()){
            PostScheduleShareEntity postScheduleShareEntity = PostScheduleShareEntity.builder()
                    .postFK(postEntity)
                    .scheduleFK(scheduleService.findEntity(scheduleCd))
                    .build();
            if (Optional.ofNullable(postScheduleShareRepository.save(postScheduleShareEntity)).isPresent()) returnNum++;
        }
        return returnNum;
    }

    @Transactional
    public Boolean save(Long postCd, Long scheduleCd){
        PostScheduleShareEntity postScheduleShareEntity = PostScheduleShareEntity.builder()
                .postFK(postService.findEntity(postCd))
                .scheduleFK(scheduleService.findEntity(scheduleCd))
                .build();
        return Optional.ofNullable(postScheduleShareRepository.save(postScheduleShareEntity)).isPresent();
    }

    @Transactional
    public Boolean delete(Long postCd, Long scheduleCd){
        PostScheduleShareEntity postScheduleShareEntity = PostScheduleShareEntity.builder()
                .postFK(postService.findEntity(postCd))
                .scheduleFK(scheduleService.findEntity(scheduleCd))
                .build();
        return !Optional.ofNullable(this.findEntity(postCd, scheduleCd)).isPresent();
    }

    @Transactional(readOnly = true)
    public PostScheduleShareEntity findEntity(Long postCd, Long scheduleCd){
        PostEntity postEntity = postService.findEntity(postCd);
        ScheduleEntity scheduleEntity = scheduleService.findEntity(scheduleCd);
        return postScheduleShareRepository.findByPostFKAndScheduleFK(postEntity, scheduleEntity);
    }
}
