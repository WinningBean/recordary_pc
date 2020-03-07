package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.GroupEntity;
import com.fairy_pitt.recordary.common.entity.PostEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {
    PostEntity findByPostCd(Long postCd);

    List<PostEntity> findAllByUserFK(UserEntity userFK);
    List<PostEntity> findAllByGroupFK(GroupEntity groupEntity);
    List<PostEntity> findAllByPostExLike(String postEx);
    List<PostEntity> findAllByPostExLikeAndUserFK(String postEx, UserEntity userEntity);
    List<PostEntity> findAllByPostExLikeAndGroupFK(String postEx, GroupEntity groupEntity);
    List<PostEntity> findAllByPostOriginFK(PostEntity postOriginFK);
    List<PostEntity> findAllByPostPublicState(int postPublicState);

    List<PostEntity> findAllByUserFKAndPostPublicState(UserEntity userFK, int postPublicState);
    List<PostEntity> findAllByGroupFKAndPostPublicState(GroupEntity groupFK, int postPublicState);
}
