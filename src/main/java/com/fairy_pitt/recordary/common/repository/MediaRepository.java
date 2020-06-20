package com.fairy_pitt.recordary.common.repository;

import com.fairy_pitt.recordary.common.domain.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaRepository extends JpaRepository<MediaEntity, Long> {
    MediaEntity findByMediaCd(Long mediaCd);
}
