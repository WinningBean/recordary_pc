package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.domain.PostEntity;
import com.fairy_pitt.recordary.common.domain.PostTagEntity;
import com.fairy_pitt.recordary.common.domain.UserEntity;
import com.fairy_pitt.recordary.common.pk.PostTagPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostTagRepository extends JpaRepository<PostTagEntity, PostTagPK> {
    PostTagEntity findByPostFKAndUserFK(PostEntity postFK, UserEntity userFK);
    List<PostTagEntity> findAllByUserFK(UserEntity userFK);
    List<PostTagEntity> findAllByPostFK(PostEntity postFK);
}
