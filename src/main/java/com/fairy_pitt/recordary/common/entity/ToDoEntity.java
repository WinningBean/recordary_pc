package com.fairy_pitt.recordary.common.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@Table(name = "TODO_TB")
@Entity
public class ToDoEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TODO_CD")
    private Long toDoCd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TODO_USER_FK")
    private UserEntity userFK;

    @Column(name = "TODO_CONTENT")
    private String toDoContent;

    @Column(name = "TODO_END_YMD")
    private Date toDoEndDate;

    @Column(name = "TODO_COLOR")
    private String toDoCol;

    @Column(name = "TODO_COMPLETE_STATE")
    private  Boolean ToDoCompleteState;

    @Builder
    public ToDoEntity(UserEntity user,
                      String toDoContent,
                      Date toDoEndDate,
                      String toDoCol) {

        this.userFK = user;
        this.toDoContent = toDoContent;
        this.toDoEndDate = toDoEndDate;
        this.toDoCol = toDoCol;
    }

    public void updateToDo(String toDoContent,
                           Date toDoEndDate,
                           String toDoCol)
    {
        this.toDoContent = toDoContent;
        this.toDoEndDate = toDoEndDate;
        this.toDoCol = toDoCol;
    }

    public  void updateToDoState(Boolean toDoCompleteState){
        this.ToDoCompleteState = toDoCompleteState;
    }

}