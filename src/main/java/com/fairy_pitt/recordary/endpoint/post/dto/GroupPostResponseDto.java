package com.fairy_pitt.recordary.endpoint.post.dto;

import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.endpoint.comment.dto.CommentResponseDto;
import com.fairy_pitt.recordary.endpoint.media.dto.MediaResponseDto;
import com.fairy_pitt.recordary.endpoint.schedule.dto.ScheduleResponseDto;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Getter
@NoArgsConstructor
public class GroupPostResponseDto {

    private Long postCd;
    private UserResponseDto userFK;
    private PostResponseDto postOriginFK;
    private ScheduleResponseDto scheduleFK;
    private MediaResponseDto mediaFK;
    private List<CommentResponseDto> commentList;
    private String postEx;
    private int postPublicState;
    private Boolean postScheduleShareState;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public GroupPostResponseDto(PostEntity postEntity){
        this.postCd = postEntity.getPostCd();
        this.userFK = new UserResponseDto(postEntity.getUserFK());
        if (postEntity.getPostOriginFK() != null) this.postOriginFK = new PostResponseDto(postEntity.getPostOriginFK());
        if (postEntity.getScheduleFK() != null) this.scheduleFK = new ScheduleResponseDto(postEntity.getScheduleFK());
        if (postEntity.getMediaFK() != null) this.mediaFK = new MediaResponseDto(postEntity.getMediaFK());
        this.commentList = postEntity.getPostComments().stream()
                .filter(c -> c.getCommentOriginFK() == null)
                .map(CommentResponseDto::new)
                .collect(Collectors.toList());
        this.postEx = postEntity.getPostEx();
        this.postPublicState = postEntity.getPostPublicState();
        this.postScheduleShareState = postEntity.getPostScheduleShareState();
        this.createdDate = postEntity.getCreatedDate();
        this.modifiedDate = postEntity.getModifiedDate();
    }

}
