package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.domain.CommentEntity;
import com.fairy_pitt.recordary.common.domain.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    Long countByCommentOriginFKIsNotNull();
    Long countByCommentOriginFK(CommentEntity commentEntity);

    CommentEntity findByCommentCd(Long CommentCd);

    List<CommentEntity> findAllByCommentOriginFK(CommentEntity commentEntity);
    List<CommentEntity> findAllByCommentPostFKAndCommentOriginFKIsNull(PostEntity postFK);
}
