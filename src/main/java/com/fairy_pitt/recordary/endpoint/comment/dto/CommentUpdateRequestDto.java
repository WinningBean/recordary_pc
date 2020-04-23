package com.fairy_pitt.recordary.endpoint.comment.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CommentUpdateRequestDto {

    private String content;

    @Builder
    public CommentUpdateRequestDto(String content)
    {
        this.content = content;
    }
}
