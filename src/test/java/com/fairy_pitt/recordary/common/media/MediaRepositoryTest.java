package com.fairy_pitt.recordary.common.media;

import com.fairy_pitt.recordary.common.entity.MediaEntity;
import com.fairy_pitt.recordary.common.repository.MediaRepository;
import com.fairy_pitt.recordary.common.repository.UserRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MediaRepositoryTest {

    @Autowired
    MediaRepository mediaRepository;
    @Autowired
    UserRepository userRepository;

    @After
    public void cleanup(){
        mediaRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void 미디어저장_불러오기(){
        //given
        mediaRepository.save(MediaEntity.builder()
                .mediaPath("testPath")
                .build());

        //when
        List<MediaEntity> mediaEntityList = mediaRepository.findAll();

        //then
        MediaEntity mediaEntity = mediaEntityList.get(0);
        assertThat(mediaEntity.getMediaCd()).isEqualTo(mediaEntity.getMediaCd());
        assertThat(mediaEntity.getMediaPath()).isEqualTo(mediaEntity.getMediaPath());
    }

    @Test
    public void BaseTimeEntity_등록(){
        //given
        LocalDateTime now = LocalDateTime.of(2020, 5, 11, 0, 0, 0);

        mediaRepository.save(MediaEntity.builder()
                .mediaPath("testPath")
                .build());

        //when
        List<MediaEntity> mediaEntityList = mediaRepository.findAll();

        //then
        MediaEntity mediaEntity = mediaEntityList.get(0);

        System.out.println(">>>>>>>>> createDate=" + mediaEntity.getCreatedDate() + ", modifiedDate=" + mediaEntity.getModifiedDate());

        assertThat(mediaEntity.getCreatedDate()).isAfter(now);
        assertThat(mediaEntity.getModifiedDate()).isAfter(now);
    }
}
