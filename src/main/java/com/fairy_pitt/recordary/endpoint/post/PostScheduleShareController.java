package com.fairy_pitt.recordary.endpoint.post;

import com.fairy_pitt.recordary.endpoint.post.dto.PostScheduleShareSaveRequestDto;
import com.fairy_pitt.recordary.endpoint.post.service.PostScheduleShareService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("post")
@RequiredArgsConstructor
@RestController
public class PostScheduleShareController {
    private final PostScheduleShareService postScheduleShareService;
    private final UserService userService;

    @PostMapping("/scheduleShare")
    public int postScheduleShare(@RequestBody PostScheduleShareSaveRequestDto requestDto){
        userService.checkSessionLogout();
        return postScheduleShareService.saveList(requestDto);
    }

    @DeleteMapping("/scheduleShare/{postCd}/{scheduleCd}")
    public Boolean postScheduleUnShare(@PathVariable Long postCd, @PathVariable Long scheduleCd){
        userService.checkSessionLogout();
        return postScheduleShareService.delete(postCd, scheduleCd);
    }
}
