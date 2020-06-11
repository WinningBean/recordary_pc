package com.fairy_pitt.recordary.endpoint.media;

import com.fairy_pitt.recordary.endpoint.media.service.MediaService;
import com.fairy_pitt.recordary.endpoint.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequestMapping("media")
@RequiredArgsConstructor
@RestController
public class MediaController {

    private final MediaService mediaService;
    private final PostService postService;

    @PostMapping("/{userCd}")
    public Long upload(@PathVariable Long userCd, @RequestParam MultipartFile[] mediaFiles) throws IOException {
        return  mediaService.save(mediaFiles, userCd);
    }

    @PostMapping("/{userCd}/upload/{scheduleCd}")
    public Boolean addMedia(@PathVariable Long scheduleCd, @PathVariable Long userCd, @RequestParam MultipartFile[] mediaFiles) throws IOException {
        Long mediaCd  = mediaService.save(mediaFiles, userCd);
        return postService.addMedia(scheduleCd,mediaCd);
    }

    @GetMapping("/{mediaCd}")
    public List<String> getMediaPath(@PathVariable Long mediaCd){
        return mediaService.getMediaPath(mediaCd);
    }

    @DeleteMapping("/{mediaCd}")
    public void delete(@PathVariable Long mediaCd){
        mediaService.delete(mediaCd);
    }
}