package com.fairy_pitt.recordary.endpoint.notice;

import com.fairy_pitt.recordary.endpoint.notice.dto.NoticeDto;
import com.fairy_pitt.recordary.endpoint.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class NoticeController {

    private final NoticeService noticeService;

    @MessageMapping("/notice")
    public void userNotice(@Payload NoticeDto noticeDto){
        noticeService.sendNotice(noticeDto);
    }

    @MessageMapping("/timeLine")
    public void timeLineNotice(@Payload Long postCd){
        noticeService.sendTimeLine(postCd);
    }
}
