package com.fairy_pitt.recordary.endpoint.comment.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CommentUpdateRequestDto {

    private String commentContent;

    @Builder
    public CommentUpdateRequestDto(String commentContent)
    {
        this.commentContent = commentContent;
    }
}
