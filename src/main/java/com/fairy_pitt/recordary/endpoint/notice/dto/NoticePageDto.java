package com.fairy_pitt.recordary.endpoint.notice.dto;

import com.fairy_pitt.recordary.common.domain.GroupApplyEntity;
import com.fairy_pitt.recordary.common.domain.ScheduleMemberEntity;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class NoticePageDto {

    private Long groupCd;
    private Long scheduleCd;
    private Long userCd;
    private String userNm;
    private String userPic;
    private String groupNm;
    private String scheduleNm;
    private String groupPic;
    private LocalDateTime createTime;


    public NoticePageDto(GroupApplyEntity groupApply)
    {
        this.groupCd = groupApply.getGroupFK().getGroupCd();
        this.groupNm = groupApply.getGroupFK().getGroupNm();
        this.groupPic = groupApply.getGroupFK().getGroupPic();
        this.createTime = groupApply.getCreatedDate();
    }

    public NoticePageDto(ScheduleMemberEntity scheduleMember)
    {
        this.scheduleCd = scheduleMember.getScheduleFK().getScheduleCd();
        this.scheduleNm = scheduleMember.getScheduleFK().getScheduleNm();
        this.userCd = scheduleMember.getScheduleFK().getUserFk().getUserCd();
        this.userNm = scheduleMember.getScheduleFK().getUserFk().getUserNm();
        this.userPic = scheduleMember.getScheduleFK().getUserFk().getUserPic();
        this.createTime = scheduleMember.getCreatedDate();
    }
}
