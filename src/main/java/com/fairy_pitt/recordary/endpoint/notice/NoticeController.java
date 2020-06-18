package com.fairy_pitt.recordary.endpoint.notice;

import com.fairy_pitt.recordary.endpoint.notice.dto.NoticeDto;
import com.fairy_pitt.recordary.endpoint.notice.service.NoticeService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class NoticeController {

    private final UserService userService;
    private final NoticeService noticeService;

    @MessageMapping("/notice/{userCd}")
    public void userNotice(@DestinationVariable Long userCd, @Payload NoticeDto noticeDto){
        if (userService.currentUserCd() != userCd) return;
        noticeService.sendNotice(noticeDto);
    }

    @MessageMapping("/timeLine/{userCd}")
    public void timeLineNotice(@DestinationVariable Long userCd, @Payload Long postCd){
        if (userService.currentUserCd() != userCd) return;
        noticeService.sendTimeLine(postCd);
    }
}
