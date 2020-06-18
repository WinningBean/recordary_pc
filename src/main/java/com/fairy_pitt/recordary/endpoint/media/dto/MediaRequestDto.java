package com.fairy_pitt.recordary.endpoint.media.dto;

import com.fairy_pitt.recordary.common.domain.MediaEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MediaRequestDto {

    private String mediaPath;

    public MediaEntity toEntity(){
        return MediaEntity.builder()
                .mediaPath(mediaPath)
                .build();
    }

    @Builder
    public MediaRequestDto(String mediaPath) {
        this.mediaPath = mediaPath;
    }

}
