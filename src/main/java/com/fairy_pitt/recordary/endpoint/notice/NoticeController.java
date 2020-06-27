package com.fairy_pitt.recordary.endpoint.notice;

import com.fairy_pitt.recordary.endpoint.group.service.GroupApplyService;
import com.fairy_pitt.recordary.endpoint.notice.dto.NoticeDto;
import com.fairy_pitt.recordary.endpoint.notice.dto.NoticePageDto;
import com.fairy_pitt.recordary.endpoint.notice.service.NoticeService;
import com.fairy_pitt.recordary.endpoint.schedule.service.ScheduleMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Controller
public class NoticeController {

    private final NoticeService noticeService;
    private final GroupApplyService groupApplyService;
    private final ScheduleMemberService scheduleMemberService;

    @MessageMapping("/notice")
    public void userNotice(@Payload NoticeDto noticeDto){
        noticeService.sendNotice(noticeDto);
    }

    @MessageMapping("/timeLine")
    public void timeLineNotice(@Payload Long postCd){
        noticeService.sendTimeLine(postCd);
    }

    @ResponseBody
    @GetMapping("notice/accept/{userCd}")
    public List<NoticePageDto> userNoticePage(@PathVariable Long userCd)
    {
        List<NoticePageDto> result = new ArrayList<>();
        result.addAll(groupApplyService.findGroupAppliesToUser(userCd));
        result.addAll(scheduleMemberService.findInvite(userCd));
        return noticeService.noticeSort(result);
    }
}
