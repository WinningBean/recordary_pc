package com.fairy_pitt.recordary.common.entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Table(name = "MEDIA_TB")
@Entity
public class MediaEntity extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "MEDIA_CD")
    private Long mediaCd;

    @Column(name = "MEDIA_PATH")
    private String mediaPath;

    @Builder
    public MediaEntity(String mediaPath) {
        this.mediaPath = mediaPath;
    }
}
