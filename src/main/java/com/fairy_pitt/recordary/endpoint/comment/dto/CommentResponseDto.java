package com.fairy_pitt.recordary.endpoint.comment.dto;

import com.fairy_pitt.recordary.common.domain.CommentEntity;
import com.fairy_pitt.recordary.endpoint.user.dto.UserResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentResponseDto {
    private Long commentCd;
    private UserResponseDto userFK;
    private String commentContent;
    private int reCommentCount;

    public CommentResponseDto(CommentEntity comment)
    {
        this.commentCd = comment.getCommentCd();
        this.userFK = new UserResponseDto(comment.getCommentUserFK());
        this.commentContent = comment.getCommentContent();
        this.reCommentCount = comment.getCommentOriginList().size();
    }
}
