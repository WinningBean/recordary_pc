package com.fairy_pitt.recordary.endpoint.media;

import com.fairy_pitt.recordary.endpoint.media.dto.MediaRequestDto;
import com.fairy_pitt.recordary.endpoint.media.service.MediaService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("media")
public class MediaController {

    private final S3Uploader s3Uploader;
    private final MediaService mediaService;

//    @GetMapping("/")
//    public String index() {
//        return "index";
//    }

    @PostMapping("/upload")
    @ResponseBody
    public String upload(@RequestParam("data") MultipartFile multipartFile) throws IOException {
        String imgPath = s3Uploader.upload(multipartFile, "static"); // bucket 의 static 디렉토리로 파일을 전달
        MediaRequestDto mediaRequestDto = new MediaRequestDto(imgPath);
        mediaService.save(mediaRequestDto);
        return  "";
    }

    @GetMapping("{bucketName}")
    public List<String> getPhoto(@PathVariable("bucketName") String bucketName)
    {
        return s3Uploader.listObject(bucketName);
    }
}
