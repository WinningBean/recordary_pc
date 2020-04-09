package com.fairy_pitt.recordary.endpoint.media.service;

import com.fairy_pitt.recordary.common.repository.MediaRepository;
import com.fairy_pitt.recordary.endpoint.media.dto.MediaRequestDto;
import com.fairy_pitt.recordary.endpoint.media.dto.MediaResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MediaService {

    private final MediaRepository mediaRepository;

    public Long save(MediaRequestDto requestDto){

        return   mediaRepository.save(requestDto.toEntity()).getMediaCd();
    }

//    public List<MediaResponseDto> find(Long id){
//
//        List<MediaResponseDto> MediaResponseDtoList = new ArrayList<>();
//        MediaResponseDtoList =
//        return new MediaResponseDto(mediaRepository.findByMediaCd(id));
//    }
}
