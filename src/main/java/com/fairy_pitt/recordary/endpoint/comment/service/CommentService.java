package com.fairy_pitt.recordary.endpoint.comment.service;

import com.fairy_pitt.recordary.common.domain.CommentEntity;
import com.fairy_pitt.recordary.common.domain.NoticeType;
import com.fairy_pitt.recordary.common.domain.PostEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.repository.CommentRepository;
import com.fairy_pitt.recordary.endpoint.comment.dto.CommentRequestDto;
import com.fairy_pitt.recordary.endpoint.comment.dto.CommentResponseDto;
import com.fairy_pitt.recordary.endpoint.notice.service.NoticeService;
import com.fairy_pitt.recordary.endpoint.post.service.PostService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserService userService;
    private final PostService postService;

    @Autowired
    private NoticeService noticeService;

    @Transactional
    public Long save(CommentRequestDto requestDto){
        UserEntity user = userService.findEntity(requestDto.getUserCd());
        PostEntity post = postService.findEntity(requestDto.getPostCd());
        CommentEntity comment = null;
        if(requestDto.getCommentOriginCd() != null)
        {
            comment = commentRepository.findByCommentCd(requestDto.getCommentOriginCd());
        }
        Long commentCd = commentRepository.save(requestDto.toEntity(user, post,comment)).getCommentCd();
        if (requestDto.getCommentOriginCd() != null) noticeService.sendNotice(NoticeType.COMMENT_SUB_NEW, commentCd, requestDto.getCommentOriginCd());
        else noticeService.sendNotice(NoticeType.COMMENT_NEW, commentCd, requestDto.getPostCd());
        return commentCd;
    }

    @Transactional
    public Long update(Long commentCd, String commentContent)
    {
        CommentEntity commentEntity = commentRepository.findByCommentCd(commentCd);
        commentEntity.updateContent(commentContent);
        return commentCd;
    }

    @Transactional
    public Boolean delete(Long commentCd){
         commentRepository.deleteById(commentCd);
         return !Optional.ofNullable(this.findEntity(commentCd)).isPresent();
    }

    @Transactional
    public Long findChildCommentCount(Long commentCd)
    {
        CommentEntity comment = commentRepository.findByCommentCd(commentCd);
        return commentRepository.countByCommentOriginFK(comment);
    }

    @Transactional
    public List<CommentResponseDto> findChildComment(Long commentCd){
        CommentEntity comment = commentRepository.findByCommentCd(commentCd);
        return commentRepository.findAllByCommentOriginFK(comment).stream()
                .map(CommentResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CommentEntity findEntity(Long commentCd){
        return commentRepository.findByCommentCd(commentCd);
    }
}
