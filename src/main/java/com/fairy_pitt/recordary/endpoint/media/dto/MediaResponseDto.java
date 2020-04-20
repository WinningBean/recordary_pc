package com.fairy_pitt.recordary.endpoint.media.dto;

import com.fairy_pitt.recordary.common.entity.MediaEntity;
import lombok.Getter;

@Getter
public class MediaResponseDto {

    private Long mediaCd;
    private String mediaPath;

    public MediaResponseDto(MediaEntity mediaEntity)
    {
        this.mediaCd = mediaEntity.getMediaCd();
        this.mediaPath = mediaEntity.getMediaPath();
    }
}
