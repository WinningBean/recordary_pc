package com.fairy_pitt.recordary.common.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "CHAT_TB")
public class ChatEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHAT_CD")
    private Long chatCd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHAT_USER_FK")
    private UserEntity userFK;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHAT_ROOM_FK", nullable = false)
    private ChatRoomEntity roomFK;

    private String content;

    @Builder
    public ChatEntity(UserEntity userFK,
                      ChatRoomEntity roomFK,
                      String content)
    {
        this.content =  content;
        this.roomFK = roomFK;
        this.userFK = userFK;
    }

}
