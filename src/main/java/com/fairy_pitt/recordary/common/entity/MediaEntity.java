package com.fairy_pitt.recordary.common.entity;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Table(name = "MEDIA_TB")
@Entity
public class MediaEntity extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEDIA_CD")
    private Long mediaCd;

    @Column(name = "MEDIA_PATH", nullable = false)
    private String mediaPath;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "mediaFK")
    private List<PostEntity> postList = new ArrayList<>();

    @Builder
    public MediaEntity(String mediaPath) {
        this.mediaPath = mediaPath;
    }

    public String getFirstPath(){
        AmazonS3 amazonS3Client = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.AP_NORTHEAST_2)
                .build();
        return amazonS3Client.getUrl("recordary-springboot-upload", mediaPath + "/1").toString();
    }
}
