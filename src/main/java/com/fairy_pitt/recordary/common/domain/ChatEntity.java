package com.fairy_pitt.recordary.common.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "CHAT_TB")
public class ChatEntity extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHAT_CD")
    private Long chatCd;

    @Column(name = "CHAT_CONTENT", nullable = false)
    @Type(type = "text")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHAT_USER_FK")
    private UserEntity userFK;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHAT_ROOM_FK", nullable = false)
    private ChatRoomEntity roomFK;

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
