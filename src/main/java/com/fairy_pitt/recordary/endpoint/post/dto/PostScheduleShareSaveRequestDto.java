package com.fairy_pitt.recordary.endpoint.post.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class PostScheduleShareSaveRequestDto {
    private PostSaveRequestDto postFK;
    private List<Long> scheduleCdList;

    @Builder
    public PostScheduleShareSaveRequestDto(PostSaveRequestDto postFK,
                              List<Long> scheduleCdList) {
        this.postFK = postFK;
        this.scheduleCdList = scheduleCdList;
    }
}
