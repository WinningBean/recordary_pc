package com.fairy_pitt.recordary.endpoint.media;

import com.fairy_pitt.recordary.endpoint.media.service.MediaService;
import com.fairy_pitt.recordary.endpoint.post.service.PostService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
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
    private final UserService userService;

    @PostMapping("/{userCd}")
    public Long upload(@PathVariable Long userCd, @RequestParam MultipartFile[] mediaFiles, @RequestParam String[] extension) throws IOException {
        userService.checkSessionLogout();
        return  mediaService.save(mediaFiles, userCd, extension);
    }

    @PostMapping("/{userCd}/upload/{scheduleCd}")
    public Boolean addMedia(@PathVariable Long scheduleCd, @PathVariable Long userCd, @RequestParam MultipartFile[] mediaFiles, @RequestParam String[] extension) throws IOException {
        userService.checkSessionLogout();
        Long mediaCd  = mediaService.save(mediaFiles, userCd, extension);
        return postService.addMedia(scheduleCd,mediaCd);
    }

    @GetMapping("/{mediaCd}")
    public List<String> getMediaPath(@PathVariable Long mediaCd){
        userService.checkSessionLogout();
        return mediaService.getMediaPath(mediaCd);
    }

    @DeleteMapping("/{mediaCd}")
    public Boolean delete(@PathVariable Long mediaCd){
        userService.checkSessionLogout();
        return mediaService.delete(mediaCd);
    }
}