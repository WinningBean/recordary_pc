package com.fairy_pitt.recordary.endpoint.comment.service;

import com.fairy_pitt.recordary.common.entity.CommentEntity;
import com.fairy_pitt.recordary.common.repository.CommentRepository;
import com.fairy_pitt.recordary.common.repository.PostRepository;
import com.fairy_pitt.recordary.common.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final ScheduleRepository scheduleRepository;

    public Boolean insertComment(CommentEntity commentEntity)
    {
        commentRepository.save(commentEntity);
        return true;
    }

    public Boolean deleteComment()
    {

        return true;
    }

    public Boolean updateComment(CommentEntity commentEntity,long id)
    {
        CommentEntity currCommentEntity = commentRepository.findById(id).get();
       // currCommentEntity.set
        return true;
    }

    public List<CommentEntity> findChildComment()
    {
        List<CommentEntity> commentEntityList = new ArrayList<>();

        return commentEntityList;
    }

    public List<CommentEntity> findOriginComment()
    {
        List<CommentEntity> commentEntityList = new ArrayList<>();

        return commentEntityList;
    }

    public long findChildCommentCount()
    {
        return commentRepository.countByCommentOriginFKIsNotNull();
    }
    // insert

    //delete

    //update

    //read
}
