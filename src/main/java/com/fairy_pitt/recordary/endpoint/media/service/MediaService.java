package com.fairy_pitt.recordary.endpoint.media.service;

import com.fairy_pitt.recordary.common.entity.MediaEntity;
import com.fairy_pitt.recordary.common.repository.MediaRepository;
import com.fairy_pitt.recordary.endpoint.main.S3UploadComponent;
import com.fairy_pitt.recordary.endpoint.media.dto.MediaRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MediaService {

    private final S3UploadComponent s3UploadComponent;
    private final MediaRepository mediaRepository;

    public Long save(MultipartFile[] multipartFile, Long userCd) throws IOException {
        String mediaPath = this.mediaUpload(multipartFile, userCd);
        MediaRequestDto mediaRequestDto = new MediaRequestDto(mediaPath);
        return mediaRepository.save(mediaRequestDto.toEntity()).getMediaCd();
    }

    private String mediaUpload(MultipartFile[] multipartFile, Long userCd) throws IOException{
        return s3UploadComponent.mediaEntityUpload(multipartFile, userCd);
    }

    public List<String> getMediaPath(Long mediaCd){
        return this.findPath(findEntity(mediaCd).getMediaPath());
    }

    public void delete(Long mediaCd){
        MediaEntity mediaEntity = findEntity(mediaCd);
        s3UploadComponent.mediaDelete(mediaEntity.getMediaPath());
        mediaRepository.delete(mediaEntity);
    }

    private List<String> findPath(String path){
        return s3UploadComponent.listObject(path);
    }

    public MediaEntity findEntity(Long mediaCd){
        return mediaRepository.findByMediaCd(mediaCd);
    }
}
