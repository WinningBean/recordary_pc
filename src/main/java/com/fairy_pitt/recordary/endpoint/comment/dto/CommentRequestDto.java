package com.fairy_pitt.recordary.endpoint.comment.dto;

import com.fairy_pitt.recordary.common.entity.CommentEntity;
import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class CommentRequestDto {

    private Long commentUserFK;
    private Long commentPostFK;
    private String content;
    private Long commentOriginFK;

    public CommentEntity toEntity(UserEntity user, PostEntity Post, CommentEntity comment){
        return CommentEntity.builder()
                .commentUserFK(user)
                .commentPostFK(Post)
                .commentOriginFK(comment)
                .content(content)
                .build();
    }


}
