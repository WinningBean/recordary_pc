package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.CommentEntity;
import com.fairy_pitt.recordary.common.entity.FollowerEntity;
import com.fairy_pitt.recordary.common.pk.FollowerPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    Long countByCommentOriginFKIsNotNull();
    Long countByCommentOriginFK(CommentEntity commentEntity);
    List<CommentEntity> findAllByCommentOriginFK(CommentEntity commentEntity);
    List<CommentEntity> findAllByCommentOriginFKNotNull();

}
