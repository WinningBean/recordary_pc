package com.fairy_pitt.recordary.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "MEDIA_TB")
public class MediaEntity extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEDIA_CD")
    private Long mediaCd;

    @Column(name = "MEDIA_PATH")
    private String mediaPath;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "mediaFK")
    private List<PostEntity> postList = new ArrayList<>();

    @Builder
    public MediaEntity(String mediaPath){
        this.mediaPath = mediaPath;
    }
}
