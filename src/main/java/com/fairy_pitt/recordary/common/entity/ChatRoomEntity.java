package com.fairy_pitt.recordary.common.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "CHAT_ROOM_TB")
public class ChatRoomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHAT_ROOM_CD")
    private Long roomCd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHAT_ROOM_USER_FK", nullable = false)
    private UserEntity userFK;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHAT_ROOM_TARGET_FK", nullable = false)
    private UserEntity targetFK;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHAT_ROOM_GROUP_FK", nullable = false)
    private GroupEntity groupFK;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "roomFK", cascade = CascadeType.REMOVE)
    private List<ChatEntity> groupChaList = new ArrayList<>();

    @Builder
    public ChatRoomEntity(UserEntity userFK,
                          UserEntity targetFK,
                          GroupEntity groupFK)
    {
        this.userFK = userFK;
        this.targetFK = targetFK;
        this.groupFK = groupFK;
    }
}
