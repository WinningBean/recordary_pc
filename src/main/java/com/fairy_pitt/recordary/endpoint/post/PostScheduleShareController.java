package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.endpoint.post.dto.PostScheduleShareSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.post.service.PostScheduleShareService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("post")
@RequiredArgsConstructor
@RestController
public class PostScheduleShareController {
    private final PostScheduleShareService postScheduleShareService;

    @PostMapping("/scheduleShare")
    public int postScheduleShare(@RequestBody PostScheduleShareSaveRequestDto requestDto){
        return postScheduleShareService.saveList(requestDto);
    }

    @DeleteMapping("/scheduleShare/{postCd}/{scheduleCd}")
    public Boolean postScheduleUnShare(@PathVariable Long postCd, @PathVariable Long scheduleCd){
        return postScheduleShareService.delete(postCd, scheduleCd);
    }
}
