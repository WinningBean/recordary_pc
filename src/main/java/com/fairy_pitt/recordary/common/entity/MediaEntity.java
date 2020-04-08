package com.fairy_pitt.recordary.common.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "MEDIA_TB")
public class MediaEntity extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "MEDIA_CD")
    private Long mediaCd;

    @Column(name = "MEDIA_PATH")
    private String mediaPath;

    @Builder
    public MediaEntity(String mediaPath){
        this.mediaPath = mediaPath;
    }
}
