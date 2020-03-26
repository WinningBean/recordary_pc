package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.entity.MediaEntity;
import com.fairy_pitt.recordary.common.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<MediaEntity, Long> {
    MediaEntity findByMediaCd(Long mediaCd);
}
