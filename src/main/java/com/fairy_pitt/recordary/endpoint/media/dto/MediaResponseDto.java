package com.fairy_pitt.recordary.endpoint.media.dto;

import com.fairy_pitt.recordary.common.entity.MediaEntity;
import com.fairy_pitt.recordary.endpoint.main.S3UploadComponent;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
public class MediaResponseDto {
    @JsonIgnore
    @Autowired
    private S3UploadComponent s3UploadComponent;

    private Long mediaCd;
    private String mediaPath;
    private String mediaFirstPath;

    public MediaResponseDto(MediaEntity mediaEntity)
    {
        this.mediaCd = mediaEntity.getMediaCd();
        this.mediaPath = mediaEntity.getMediaPath();
        this.mediaFirstPath = s3UploadComponent.listObject(mediaPath).get(0);
    }
}