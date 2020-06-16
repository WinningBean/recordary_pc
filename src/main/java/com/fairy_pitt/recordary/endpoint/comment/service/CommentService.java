package com.fairy_pitt.recordary.endpoint.comment.service;

import com.fairy_pitt.recordary.common.domain.CommentEntity;
import com.fairy_pitt.recordary.common.domain.PostEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.repository.CommentRepository;
import com.fairy_pitt.recordary.endpoint.comment.dto.CommentRequestDto;
import com.fairy_pitt.recordary.endpoint.comment.dto.CommentResponseDto;
import com.fairy_pitt.recordary.endpoint.post.service.PostService;
import com.fairy_pitt.recordary.endpoint.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserService userService;
    private final PostService postService;


    @Transactional
    public Long save(CommentRequestDto requestDto){
        UserEntity user = userService.findEntity(requestDto.getUserCd());
        PostEntity post = postService.findEntity(requestDto.getPostCd());
        CommentEntity comment = null;
        if(requestDto.getCommentOriginCd() != null )
        {
            comment = commentRepository.findByCommentCd(requestDto.getCommentOriginCd());
        }
        return  commentRepository.save(requestDto.toEntity(user, post,comment)).getCommentCd();
    }

    @Transactional
    public Long update(Long commentCd, String commentContent)
    {
        CommentEntity commentEntity = commentRepository.findByCommentCd(commentCd);
        commentEntity.updateContent(commentContent);
        return commentCd;
    }

    @Transactional
    public void delete(Long commentCd){
         commentRepository.deleteById(commentCd);
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




//    public Boolean insertComment(CommentEntity commentEntity)
//    {
//        commentRepository.save(commentEntity);
//        return true;
//    }
//
//    public Boolean deleteComment()
//    {
//
//        return true;
//    }
//
//    public Boolean updateComment(CommentEntity commentEntity,long id)
//    {
//        CommentEntity currCommentEntity = commentRepository.findById(id).get();
//       // currCommentEntity.set
//        return true;
//    }
//
//    public List<CommentEntity> findChildComment()
//    {
//        List<CommentEntity> commentEntityList = new ArrayList<>();
//
//        return commentEntityList;
//    }
//
//    public List<CommentEntity> findOriginComment()
//    {
//        List<CommentEntity> commentEntityList = new ArrayList<>();
//
//        return commentEntityList;
//    }
//
//    public long findChildCommentCount()
//    {
//        return commentRepository.countByCommentOriginFKIsNotNull();
//    }
//    // insert
//
//    //delete
//
//    //update
//
//    //read
}
